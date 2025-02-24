import { useContext, useEffect} from "react";
import { CartItems } from "../../App.jsx";

export default function ItemCard({bundle}) {
  const [cartItems, setCartItems] = useContext(CartItems);

  const onAddItemToCart = (bundle) => {
      if (!cartItems.some(item => item.name === bundle.name)) {
          var updatedCartItems = [...cartItems, bundle];
          setCartItems(updatedCartItems);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
  }

  useEffect(() => {
      const storedData = localStorage.getItem("cartItems");
      if (storedData) {
          const parseData = JSON.parse(storedData);
          if (JSON.stringify(parseData) !== JSON.stringify(cartItems)) {
              setCartItems(parseData);
          }
      }

      console.log(cartItems);
      console.log(typeof cartItems);
  }, []);

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
