import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth }
from "./AuthContext";

import type { Product }
from "../types/product";

interface CartContextType {

  cartItems: Product[];

  addToCart: (
    product: Product
  ) => void;

  removeFromCart: (
    id: number
  ) => void;
}

const CartContext =
  createContext<CartContextType | null>(
    null
  );

interface Props {
  children: React.ReactNode;
}

export const CartProvider = ({
  children,
}: Props) => {

  const { user } = useAuth();

  // Dynamic Cart Key
  const cartKey = user
    ? `cart_${user.email}`
    : "cart_guest";

  // Cart State
  const [cartItems, setCartItems] =
    useState<Product[]>([]);

  // Load Cart
  useEffect(() => {

    const savedCart =
      localStorage.getItem(cartKey);

    if (savedCart) {

      setCartItems(
        JSON.parse(savedCart)
      );

    } else {

      setCartItems([]);

    }

  }, [cartKey]);

  // Save Cart
  useEffect(() => {

    localStorage.setItem(
      cartKey,
      JSON.stringify(cartItems)
    );

  }, [cartItems, cartKey]);

  // Add Product
  const addToCart = (
    product: Product
  ) => {

    setCartItems((prev) => [
      ...prev,
      product,
    ]);

  };

  // Remove Product
  const removeFromCart = (
    id: number
  ) => {

    setCartItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );
};

// Custom Hook
export const useCart = () => {

  const context =
    useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }

  return context;
};