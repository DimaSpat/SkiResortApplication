import { useContext, useEffect} from "react";
import { CartItems } from "../../App.jsx";

export default function ItemCard({bundle}) {
  const [cartItems, setCartItems] = useContext(CartItems);

  const onAddItemToCart = (bundle) => {
      if (true) {
          var updatedCartItems = [...cartItems, bundle];
          setCartItems(updatedCartItems);
          //localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
  }

  useEffect(() => {
      const storedData = localStorage.getItem("cartItems");
      if (storedData) {
          setCartItems(JSON.parse(storedData));
      }
      console.log(bundle);
      {bundle.items.map((item, i) => {
          console.log(`${item}-${Math.random()*1000}`);
      })}
  }, []);

  useEffect(() => {
      console.log(cartItems);
      console.log(localStorage);
  }, [cartItems]);

  return (
    <div style={{ marginBottom: '20px' }}>
        <h3>{bundle.name}</h3>
        <p>{bundle.description}</p>
        <p>Price: {bundle.price}</p>
        <p>Includes:</p>
        <button onClick={() => onAddItemToCart(bundle)}>Add to Cart</button>
    </div>
  )
}
