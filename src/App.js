import {  useState } from "react/cjs/react.development";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./Store/Cartprovider";
function App() {
  const [CartIsShown, setCartIsShown] = useState(false);

  const showcarthandler = () => {
    setCartIsShown(true);
  };
  const hidecarthandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      <h2>
        <Header onShowCart={showcarthandler} />
      </h2>
      {CartIsShown && <Cart onClose={hidecarthandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
