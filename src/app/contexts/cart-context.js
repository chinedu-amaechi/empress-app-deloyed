"use client";

import useCart from "@/hooks/use-cart";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./auth-context";
import { addToCart } from "@/lib/cart-services";

const cartContext = createContext();

function CartContextProvider({ children }) {
  const { cartData, isLoading, error } = useCart();
  const [cart, setCart] = useState([]);
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    async function fetchCart() {
      if (user?.cart && cartData) {
        // If user is logged in and cartData is available, set the cart state
        console.log("User cart:", user.cart.length);

        if (user?.cart.length > 0) {
          localStorage.setItem("cart", JSON.stringify(cartData));
          setCart(cartData);
        }
        // If user is logged in but cartData is empty, check localStorage
        // and set the cart state accordingly
        else if (localStorage.getItem("cart")) {
          const localCart = JSON.parse(localStorage.getItem("cart"));

          for (let i = 0; i < localCart.length; i++) {
            const item = localCart[i];
            await addToCart(item);
          }
          setCart(localCart);
        } else {
          setCart([]);
        }
      } else {
        // If cartData is not available, check localStorage
        // and set the cart state accordingly
        localStorage.getItem("cart")
          ? setCart(JSON.parse(localStorage.getItem("cart")))
          : setCart([]);
      }
    }
    fetchCart();
  }, [user, cartData, isLoading]);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

function useCartContext() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
}

export { CartContextProvider, useCartContext };
