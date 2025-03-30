const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/pay', async (req, res) => {
  const { amount, token } = req.body;

  if (!amount || !token) {
    return res.status(400).json({ error: 'Amount and token are required' });
  }

  try {
    console.log("🔍 Received Payment Request:", { amount, token });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      payment_method: token,
      confirm: true,
    });

    console.log(" Payment Successful:", paymentIntent);
    res.status(200).json({ success: true, paymentIntent });

  } catch (error) {
    console.error(" Stripe Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
