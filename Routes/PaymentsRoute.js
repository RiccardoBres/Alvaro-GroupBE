const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    const { totalAmountCents, hash, paymentMethodId } = req.body;
    const calculatedHash = crypto.createHash('sha256').update(totalAmountCents.toString()).digest('hex');

    if (calculatedHash !== hash) {
        return res.status(400).json({ error: 'Invalid amount.' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmountCents,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
              enabled: true,
              allow_redirects: 'never',
            },
           });
    
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Errore nella creazione del pagamento intent:', error);
        res.status(500).json({ error: 'Errore nella creazione del pagamento intent.' });
    }
});

module.exports = router;
