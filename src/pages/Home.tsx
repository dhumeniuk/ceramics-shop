
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from '../components/Product';
import { Product as ProductType } from '../types';

const GET_INVENTORY = gql`
  query GetInventory {
    inventory {
      id
      name
      inventory
      image
      price
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_INVENTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return null;

  return (
    <div className="container mt-5">
      <div className="row">
        {data.inventory.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
