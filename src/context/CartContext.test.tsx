import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, CartContext } from './CartContext';

const TestComponent = () => {
  const cartContext = React.useContext(CartContext);

  if (!cartContext) {
    throw new Error('TestComponent must be used within a CartProvider');
  }

  const { cart, addToCart, removeFromCart, updateQuantity } = cartContext;

  return (
    <div>
      <div data-testid="cart-items">{JSON.stringify(cart)}</div>
      <button onClick={() => addToCart({ id: '1', name: 'Test Product', price: 10, image: 'test.jpg', inventory: 10 })}>Add Product 1</button>
      <button onClick={() => removeFromCart('1')}>Remove Product 1</button>
      <button onClick={() => updateQuantity('1', 5)}>Update Product 1 Quantity</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds items to the cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Product 1');
    await act(async () => {
      await userEvent.click(addButton);
    });

    expect(screen.getByTestId('cart-items')).toHaveTextContent('[{"id":"1","name":"Test Product","price":10,"quantity":1}]');
  });

  it('removes items from the cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Product 1');
    await act(async () => {
      await userEvent.click(addButton);
    });

    const removeButton = screen.getByText('Remove Product 1');
    await act(async () => {
      await userEvent.click(removeButton);
    });

    expect(screen.getByTestId('cart-items')).toHaveTextContent('[]');
  });

  it('updates item quantity in the cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Product 1');
    await act(async () => {
      await userEvent.click(addButton);
    });

    const updateButton = screen.getByText('Update Product 1 Quantity');
    await act(async () => {
      await userEvent.click(updateButton);
    });

    expect(screen.getByTestId('cart-items')).toHaveTextContent('[{"id":"1","name":"Test Product","price":10,"quantity":5}]');
  });

  it('loads cart from local storage on initial render', () => {
    localStorage.setItem('cart', JSON.stringify([{ id: '99', quantity: 3 }]));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-items')).toHaveTextContent('[{"id":"99","quantity":3}]');
  });

  it('saves cart to local storage on cart changes', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add Product 1');
    await act(async () => {
      await userEvent.click(addButton);
    });

    expect(localStorage.getItem('cart')).toBe('[{"id":"1","name":"Test Product","price":10,"quantity":1}]');
  });
});