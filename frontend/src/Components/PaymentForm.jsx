import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../CSS/PaymentForm.css';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');
    setSuccessMessage(null);
  
    if (!stripe || !elements) {
      setErrorMessage('Stripe is not properly loaded.');
      setIsProcessing(false);
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage('Card details are missing.');
      setIsProcessing(false);
      return;
    }
  
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
        return;
      }
  
      console.log("🔍 Sending Payment Request:", { token: paymentMethod.id, amount: 1000 });
  
      const response = await fetch('http://localhost:5000/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: paymentMethod.id, amount: 1000 }),
      });
  
      // Check if the response is okay
      if (!response.ok) {
        setErrorMessage('Payment failed. Please try again.');
        setIsProcessing(false);
        return;
      }
  
      const data = await response.json();
      console.log("🔍 Payment API Response:", data);
  
      if (data.success) {
        setSuccessMessage('Payment Successful! Thank you.');
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error("Frontend Payment Error:", error);
      setErrorMessage('An error occurred while processing the payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form">
      <h2>Payment Information</h2>
      <p>Total: $10.00</p>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Card Number</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: '"Roboto", sans-serif',
                  '::placeholder': { color: '#aab7c4' },
                },
              },
            }}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="button-container">
          <button className="payment-button" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
