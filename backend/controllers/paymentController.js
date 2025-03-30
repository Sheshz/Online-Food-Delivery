const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Load the key from .env file
const router = express.Router();

/// Payment endpoint that processes the payment
router.post('/pay', async (req, res) => {
  const { amount, token } = req.body;

  if (!amount || !token) {
    return res.status(400).json({ error: 'Amount and token are required' });
  }

  try {
    // Create a PaymentIntent and confirm the payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: token,
      confirm: true,
      return_url: 'http://localhost:3000/payment-complete'   // Provide a return URL
    });
    

    // Send success response back with the payment intent details
    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Error processing payment:", error);  // Log the error for debugging
    res.status(500).json({ error: error.message });  // Return the detailed error message to the frontend
  }
});



// Create a PaymentIntent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body; // Amount to charge (in cents)

    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires amount in cents
      currency: currency || 'usd',
      payment_method_types: ['card'],
    });

    // Send client secret to frontend for confirmation
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: error.message });
  }
};