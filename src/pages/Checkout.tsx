
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Replace with your own Stripe publishable key
const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [shipping, setShipping] = useState('pickup');

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = shipping === 'delivery' ? 20 : 0;
  const totalPrice = subtotal + shippingFee;

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="row mt-3">
            <div className="col-md-6">
              <h5>Shipping</h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shipping"
                  id="pickup"
                  value="pickup"
                  checked={shipping === 'pickup'}
                  onChange={() => setShipping('pickup')}
                />
                <label className="form-check-label" htmlFor="pickup">
                  Pickup (Free)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="shipping"
                  id="delivery"
                  value="delivery"
                  checked={shipping === 'delivery'}
                  onChange={() => setShipping('delivery')}
                />
                <label className="form-check-label" htmlFor="delivery">
                  Delivery ($20.00)
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-end">
                <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
                <h5>Shipping: ${shippingFee.toFixed(2)}</h5>
                <h4>Total: ${totalPrice.toFixed(2)}</h4>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
