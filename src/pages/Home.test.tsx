import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CartProvider } from '../context/CartContext';
import Home from './Home';
import { gql } from '@apollo/client';

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

const mocks = [
  {
    request: {
      query: GET_INVENTORY,
    },
    result: {
      data: {
        inventory: [
          { id: '1', name: 'Ceramic Mug', inventory: 10, image: 'image1.jpg', price: 25 },
          { id: '2', name: 'Ceramic Bowl', inventory: 5, image: 'image2.jpg', price: 35 },
        ],
      },
    },
  },
];

describe('Home component', () => {
  it('renders products fetched from GraphQL', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CartProvider>
          <Home />
        </CartProvider>
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await screen.findByText('Ceramic Mug');
    expect(screen.getByText('Ceramic Bowl')).toBeInTheDocument();
  });
});