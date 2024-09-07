import { Link } from "react-router-dom";
import React from "react";
import { CartItems } from "../../App";
import styles from "./Header.module.scss";

export function Header({ theme, setTheme }) {
  const [cartItems, setCartItems] = React.useContext(CartItems);

  const onClickTheme = () => {
    setTheme(!theme);
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/"><h1>Ski Resort</h1></Link>
      </div>
      <div>
        <Link to="/about">About</Link>
        <Link to="/prices">Prices</Link>
        <Link to="/events">Events</Link>
      </div>
      <div>
        <button onClick={onClickTheme}>
          {theme ? "Dark Mode" : "Light Mode"}
        </button>
        <button>{cartItems == [] ? "Cart" : "Buy"}</button>
      </div>
    </header>
  );
}

