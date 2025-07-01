
import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    // Replace with your own server-side payment processing logic
    console.log('Received Stripe PaymentMethod:', paymentMethod);
    // Here you would send the paymentMethod.id to your server to create a charge.

    // For this example, we'll simulate a successful payment
    setTimeout(() => {
      setSucceeded(true);
      setProcessing(false);
      clearCart();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={processing || succeeded} className="btn btn-primary mt-3">
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {succeeded && <div className="alert alert-success mt-3">Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
