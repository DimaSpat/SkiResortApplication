import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { Events } from "./pages/events/Events.jsx";
import { Header } from "./components/header/Header.jsx";
import { Admin } from "./pages/admin/Admin.jsx";
import { Prices } from "./pages/prices/Prices.jsx";
import { Bundles } from "./pages/prices/Bundles.jsx";
import { Passes } from "./pages/prices/Passes.jsx";
import { RentEquipment } from "./pages/prices/RentEquipement.jsx";
import { Contacts } from "./pages/contacts/Contacts.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const CartItems = React.createContext();
const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = React.useState(true);
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    document.body.className = theme ? "" : "theme-dark";
  }, [theme]);

  return (
    <BrowserRouter>
      <CartItems.Provider value={[cartItems, setCartItems]}>
        <div className="container">
          <Header theme={theme} setTheme={setTheme} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/events" element={<QueryClientProvider client={queryClient}><Events /></QueryClientProvider>} />
              <Route path="/admin" element={<QueryClientProvider client={queryClient}><Admin theme={theme} /></QueryClientProvider>} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/prices/bundles" element={<Bundles />} />
              <Route path="/prices/passes" element={<Passes />} />
              <Route path="/prices/rentEquipment" element={<RentEquipment />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </div>
        </div>
      </CartItems.Provider>
    </BrowserRouter>
  );
}

export default App;
