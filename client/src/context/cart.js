import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
// add a product to the cart
const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item._id === product._id);
  if (existingItem) {
    // If the product already exists in the cart, increase its quantity
    const updatedCart = cartItems.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  } else {
    // If it's a new product, add it to the cart with a quantity of 1
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
};

 // Function to remove a product from the cart
 const removeFromCart = (productId) => {
  const updatedCart = cartItems.filter((item) => item._id !== productId);
  setCartItems(updatedCart);
};

// Function to increase the quantity of a product in the cart
const increaseQuantity = (productId) => {
  const updatedCart = cartItems.map((item) =>
    item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
  );
  setCartItems(updatedCart);
};

// Function to decrease the quantity of a product in the cart
const decreaseQuantity = (productId) => {
  const updatedCart = cartItems.map((item) => {
    if (item._id === productId && item.quantity > 1) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
  setCartItems(updatedCart);
};

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to calculate the total price of items in the cart
const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.discountedPrice * item.quantity;
  }, 0);
};

const calculateActucalTotal = (cartItems) => {
  return cartItems.reduce((actual_total, item) =>{
    return actual_total + item.price * item.quantity;
  },0);
}

// Load cart items from localStorage when the component initializes
useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  }
}, []);

// update localStorage whenever cart items change
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        calculateCartTotal,
        calculateActucalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
