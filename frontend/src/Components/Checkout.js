import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Your Stripe publishable key
const stripePromise = loadStripe('your_stripe_publishable_key'); 

const CheckoutForm = () => {
  const [amount, setAmount] = useState(0); // You can set amount dynamically from the cart
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Step 1: Call your backend to create a payment intent
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const paymentIntentResponse = await response.json();
    const clientSecret = paymentIntentResponse.clientSecret;

    // Step 2: Confirm the payment using the client secret
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      // Payment was successful, save the order, etc.
      console.log('Payment successful:', result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay {amount}
      </button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
