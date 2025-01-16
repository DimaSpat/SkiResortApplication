import React, {useEffect} from "react";
import { CartItems } from "../../App.jsx";
import styles from "./Cart.module.scss";
import axios from "axios";
import nextId from "react-id-generator";

export function Cart({ state }) {
  const [cartItems, setCartItems] = React.useContext(CartItems);
  const [price, setPrice] = React.useState(0);

  const removeCartItem = (item) => {
    localStorage.removeItem("cartItems", item);
    setCartItems(prev => prev.filter(elem => elem !== item));
  }

  const onClickOrder = async () => {
      const order = {
          id: (nextId("order-")),
          price: price,
      }
      console.log(order);
      const response = await axios.post(
          "api/cart/order",
          order,
          {
              headers: {
                  "Content-Type": "application/json",
              }
          }
      );
  }

  useEffect(() => {
      const dataStored = localStorage.getItem("cartItems");
      if (dataStored && cartItems.length == 0) {
          setCartItems(dataStored);
      }
  }, []);

  useEffect(() => {
      setPrice(cartItems.reduce((total, item) => total + (item.price || 0), 0));
  }, [cartItems]);
  
  return (
    <div className={`${styles.Cart} ${state ? styles.true : ""}`}>
        <div>
            {cartItems.map((item) => (
                <div key={`${Math.random()*1000}-${item.name}`}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <button onClick={() => removeCartItem(item)}>Remove</button>
                </div>
            ))}
        </div>
        <div>
            <p>Subtotal: {price.toFixed(2)}</p>
            <p>Tax: {(price * 0.15).toFixed(2)}</p>
            <p>Total: {(price * 1.15).toFixed(2)}</p>
            <button onClick={onClickOrder}>Order</button>
        </div>
    </div>
  )
}
