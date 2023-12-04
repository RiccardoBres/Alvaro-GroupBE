const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    const { items } = req.body;

    try {
        const totalAmount = calculateTotalAmount(items);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Errore nella creazione del pagamento intent:', error);
        res.status(500).json({ error: 'Errore nella creazione del pagamento intent.' });
    }
});

function calculateTotalAmount(items) {
    let total = 0;
    items.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total * 100;
}

module.exports = router;

