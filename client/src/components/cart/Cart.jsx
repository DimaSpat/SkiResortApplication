import React, {useEffect, useState} from "react";
import { CartItems } from "../../App.jsx";
import styles from "./Cart.module.scss";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import QRCode from "react-qr-code";

export function Cart({ state, setState }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useContext(CartItems);
    const [price, setPrice] = useState(0);
    const [email, setEmail] = useState("");
    const [receiptUrl, setReceiptUrl] = useState(null);

    const removeCartItem = (item) => {
        setCartItems(prev => prev.filter(elem => elem !== item));
    }

    const onClickOrder = async () => {
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const response = await axios.post(
                "http://localhost:5173/api/cart/order",
                { price: Math.round(price * 1.15 * 100), email: email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                response.data.clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                    },
                }
            );

            if (error) {
                setError(error.message);
            } else {
                setError(null);
                const chargegResponse = await axios.get(`http://localhost:5173/api/stripe/charge/${paymentIntent.id}`);
                setReceiptUrl(chargegResponse.data.receipt_url);
                setCartItems([]);
                setState(!state);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const dataStored = localStorage.getItem("cartItems");
        if (dataStored) {
            const parsedItems = JSON.parse(dataStored);
            if (Array.isArray(parsedItems) && cartItems.length === 0) {
                setCartItems(parsedItems);
            }
        }

    }, []);

    useEffect(() => {
        setPrice(cartItems.reduce((total, item) => total + (item.price || 0), 0));
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className={`${styles.Cart} ${state ? styles.true : ""}`}>
            <div>
                {cartItems.map((item) => (
                    <div key={`${Math.random() * 1000}-${item.name}`}>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <button onClick={() => removeCartItem(item)}>Remove</button>
                    </div>
                ))}
            </div>
            <div>
                <p>Subtotal: {price.toFixed(2)} $USD</p>
                <p>Tax: {(price * 0.15).toFixed(2)} $USD</p>
                <p>Total: {(price * 1.15).toFixed(2)} $USD</p>
                <button onClick={onClickOrder} disabled={!stripe}>Order</button>
                <input type="email" name="email" id="emailInput" onChange={(e) => setEmail(e.target.value)} />
                <div style={{ display: 'flex', flexDirection:'column', gap: '2rem'}}>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                display: 'flex', // This won't work directly on the CardElement
                                flexDirection: 'column', // This won't work directly on the CardElement
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                </div>
                {receiptUrl && (
                    <div>
                        <h3>Scan the QR code for the receipt:</h3>
                        <QRCode value={receiptUrl}></QRCode>
                    </div>
                )}
            </div>
        </div>
    )
}
