
import React from 'react';
import Product from '../components/Product';

const products = [
  {
    id: 1,
    name: 'Ceramic Mug',
    price: 25,
    inventory: 10,
    image: 'https://placehold.co/600x400',
  },
  {
    id: 2,
    name: 'Ceramic Bowl',
    price: 35,
    inventory: 5,
    image: 'https://placehold.co/600x400',
  },
  {
    id: 3,
    name: 'Ceramic Plate',
    price: 45,
    inventory: 0,
    image: 'https://placehold.co/600x400',
  },
];

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
