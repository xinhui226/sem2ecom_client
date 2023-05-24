import { useState, useContext, createContext, useEffect } from "react";
import localforage from "localforage";
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCartItem = async () => {
      let cartItem = await localforage.getItem("cart");
      if (cartItem) setCart(JSON.parse(cartItem));
    };
    getCartItem();
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
