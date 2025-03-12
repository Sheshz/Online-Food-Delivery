const express = require('express');
const stripe = require('stripe')('your-secret-key-here'); // Replace with your Stripe secret key
const router = express.Router();

router.post('/payment', async (req, res) => {
  const { amount, currency, token } = req.body;
  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency, // e.g., 'usd'
      payment_method: token.id, // The Stripe token received from the frontend
      confirmation_method: 'manual',
      confirm: true,
    });
    
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send({ success: false, message: error.message });
  }
});


// Create a PaymentIntent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // Amount to charge (in cents)

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe accepts amount in cents
      currency: 'usd',
    });

    // Send client secret to frontend for confirmation
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment creation failed' });
  }
};
module.exports = router;
