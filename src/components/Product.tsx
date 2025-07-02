
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Product as ProductType } from '../types';

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) {
    throw new Error('Product must be used within CartProvider');
  }
  
  const { addToCart } = cartContext;

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          <p className="card-text">Available: {product.inventory}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product)} disabled={product.inventory === 0}>
            {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
