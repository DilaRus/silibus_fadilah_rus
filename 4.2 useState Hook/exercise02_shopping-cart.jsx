/*
Exercise 2: Shopping Cart
Task: Create a simple shopping cart component
  - Display list of products with prices
  - Add/remove items from cart
  - Show total price
  - Manage cart state with useState
*/
import { useState } from 'react';

function ShoppingCart() {
  const products = [
    { id: 1, name: 'Apple', price: 2 },
    { id: 2, name: 'Orange', price: 3 },
    { id: 3, name: 'Banana', price: 1.5 },
  ];

  const [cart, setCart] = useState([]);

  // Add a product to the end of the cart
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  // Remove one cart entry by its position
  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((item, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>

      <h3>Products</h3>
      {products.map(product => (
        <div key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => addToCart(product)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - ${item.price}
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}

export default ShoppingCart;
