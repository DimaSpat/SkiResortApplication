import { Link, redirect, useNavigate } from "react-router-dom";
import React from "react";
import { CartItems } from "../../App";
import styles from "./Header.module.scss";

export function Header({ theme, setTheme }) {
  const [cartItems, setCartItems] = React.useContext(CartItems);
  const navigate = useNavigate();

  const onClickTheme = () => {
    setTheme(!theme);
  };

  const onClickCart = () => {
    if (cartItems && cartItems.length > 0) {
      return setCartItems(cartItems);
    } else {
      navigate("/prices");
    }
  }

  return (
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
        <button onClick={onClickTheme}>
          {theme ? "Dark Mode" : "Light Mode"}
        </button>
        <button onClick={onClickCart}>{cartItems == [] ? "Cart" : "Buy"}</button>
      </div>
    </header>
  );
}

