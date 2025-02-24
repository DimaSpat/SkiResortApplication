const express = require('express');
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51PVC43DEOjHV29K2MeYhJp8uxyuki32fetEnRxozjUpZd2gHskBGQpjSLOPfrNIE24Wj68MozzAodx0s7Z5c2W1u00FrJMpMV6");

router.get("/charge/:paymentIntentId", async (req, res) => {
    try {
        console.log("Checking PaymentIntent:", req.params.paymentIntentId);

        const paymentIntent = await stripe.paymentIntents.retrieve(req.params.paymentIntentId);
        console.log("PaymentIntent Status:", paymentIntent.status);

        if (paymentIntent.status !== "succeeded") {
            return res.status(400).json({
                error: `PaymentIntent is not yet succeeded (current status: ${paymentIntent.status})`
            });
        }

        const charges = await stripe.charges.list({ payment_intent: req.params.paymentIntentId });

        if (!charges.data.length) {
            console.error("No charges found for this PaymentIntent.");
            return res.status(404).json({ error: "Charge not found." });
        }

        const charge = charges.data[0];
        console.log("Charge found:", charge);
        res.json({ receipt_url: charge.receipt_url });

    } catch (err) {
        console.error("Error fetching charge:", err.message);
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
