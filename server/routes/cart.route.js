const { Router } = require("express");
const Stripe = require("stripe");
const router = Router();
const Orders = require("../models/Orders");
const crypto = require("crypto");
const stripe = Stripe("sk_test_51PVC43DEOjHV29K2MeYhJp8uxyuki32fetEnRxozjUpZd2gHskBGQpjSLOPfrNIE24Wj68MozzAodx0s7Z5c2W1u00FrJMpMV6");

router.post("/order", async (req, res) => {
    try {
        const id = crypto.randomBytes(16).toString("hex");
        const price = req.body.price;
        const email = req.body.email;

        // Validate the price
        if (!price || isNaN(price)) {
            return res.status(400).json({ error: "Invalid price" });
        }

        // Create an order object
        const order = {
            id: id,
            price: price,
        };

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price, // Amount in cents
            currency: 'usd',
            receipt_email: email
        });

        // Save the order to the database
        await Orders.create(order);

        // Send the clientSecret back to the frontend
        return res.status(200).json({
            message: "Successfully created order",
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;
