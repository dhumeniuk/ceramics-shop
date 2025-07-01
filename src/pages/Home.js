
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Product from '../components/Product';

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
  if (error) {
    return (
      <p>
        Error :(
        {process.env.NODE_ENV === 'development' && (
          <pre>{error.message}
{error.stack}</pre>
        )}
      </p>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {data.inventory.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
