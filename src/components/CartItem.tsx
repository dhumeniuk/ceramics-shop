
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) {
    throw new Error('CartItem must be used within CartProvider');
  }
  
  const { removeFromCart, updateQuantity } = cartContext;

  return (
    <div className="row mb-3">
      <div className="col-md-2">
        <img src={item.image} alt={item.name} className="img-fluid" />
      </div>
      <div className="col-md-4">
        <h5>{item.name}</h5>
        <p>${item.price}</p>
      </div>
      <div className="col-md-2">
        <input
          type="number"
          className="form-control"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          min="1"
          max={item.inventory}
        />
      </div>
      <div className="col-md-2">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="col-md-2">
        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
