import React from "react";
import { CartItems } from "../../App.jsx";
import styles from "./Cart.module.scss";

export function Cart({ state }) {
  const [cartItems, setCartItems] = React.useContext(CartItems);
  
  return (
    <div className={`${styles.Cart} ${state ? styles.true : ""}`}>
      <h2>CartItems are {cartItems}</h2>
    </div>
  )
}
