import React, { useState } from 'react';
import PaymentForm from './components/PaymentForm';

const CheckoutPage = () => {
  const [amount, setAmount] = useState(25);  // Set amount dynamically, e.g., cart total

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: ${amount}</p>
      <PaymentForm amount={amount} />
    </div>
  );
};

export default CheckoutPage;
