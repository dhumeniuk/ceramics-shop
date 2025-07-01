
import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';
import { useMutation, gql } from '@apollo/client';

const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($amount: Int!, $currency: String!) {
    createPaymentIntent(amount: $amount, currency: $currency) {
      clientSecret
    }
  }
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, clearCart } = useContext(CartContext);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const amountInCents = Math.round(subtotal * 100); // Stripe expects amount in cents

    try {
      const { data } = await createPaymentIntent({
        variables: { amount: amountInCents, currency: 'usd' },
      });

      const clientSecret = data.createPaymentIntent.clientSecret;

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (confirmError) {
        setError(confirmError.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        clearCart();
      } else {
        setError('Payment failed: ' + paymentIntent.status);
      }
    } catch (err) {
      setError(err.message);
    }

    setProcessing(false);
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
