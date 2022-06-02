import { useContext } from "react";
import { AppContext } from "../context";

export const useCart = () => {
  let cartSum = 0;

  const { cartItems, setCartItems } = useContext(AppContext);

  for (let i = 0; i < cartItems.length; i++) {
    cartSum += Number(cartItems[i].price.replace(/\s/g, ""));
  }

  let cartTax = (cartSum / 100) * 5;

  return { cartItems, setCartItems, cartSum, cartTax };
};
