
import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';
import { useMutation, gql } from '@apollo/client';

const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($items: [ItemInput!]!, $shipping: String!) {
    createPaymentIntent(items: $items, shipping: $shipping) {
      clientSecret
    }
  }
`;

const CheckoutForm = ({ shipping, onPaymentSuccess }: { shipping: string, onPaymentSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CheckoutForm must be used within a CartProvider');
  }

  const { cart, clearCart } = cartContext;
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found");
      return;
    }

    try {
      const { data } = await createPaymentIntent({
        variables: { items: cart.map(item => ({ id: item.id, quantity: item.quantity })), shipping },
      });

      const clientSecret = data.createPaymentIntent.clientSecret;

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (confirmError) {
        if (confirmError.message) {
          setError(confirmError.message);
        } else {
          setError('An unknown error occurred.');
        }
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess();
        clearCart();
      } else {
        setError('Payment failed: ' + paymentIntent.status);
      }
    } catch (err: any) {
      setError(err.message);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={processing} className="btn btn-primary mt-3">
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
