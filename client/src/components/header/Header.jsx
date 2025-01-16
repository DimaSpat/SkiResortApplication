import { Link, redirect, useNavigate } from "react-router-dom";
import React from "react";
import { CartItems } from "../../App";
import styles from "./Header.module.scss";
import { Cart } from "../cart/Cart.jsx";

export function Header({ theme, setTheme }) {
  const [cartItems, setCartItems] = React.useContext(CartItems);
  const [cartState, setCartState] = React.useState(false);
  const navigate = useNavigate();

  const onClickTheme = () => {
    setTheme(!theme);
  };

  const onClickCart = () => {
    if (cartItems.length > 0) {
      setCartState(!cartState);
    } else {
      navigate("/prices");
    }
  }

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link to="/"><h1>Ski Resort</h1></Link>
        </div>
        <div>
          <Link to="/about">About</Link>
          <Link to="/prices">Prices</Link>
          <Link to="/events">Events</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/contacts">Contacts</Link>
        </div>
        <div>
          <button className={cartItems.length > 0 ? styles.Cart : ""} onClick={onClickCart}>{cartItems.length > 0 ? `${cartItems.length} items in Cart` : "Buy"}</button>
        </div>
      </header>
      <Cart state={cartState} />
    </>
  );
}

