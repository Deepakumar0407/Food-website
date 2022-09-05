import { useState } from 'react';

import Header from './components/Layout/Header.js';
import Meals from './components/Meals/Meals.js';
import Cart from './components/Cart/Cart.js';
import CartProvider from './store/CartProvider.js';
import Login from './components/UI/Login.js';
import Register from './components/UI/Register.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Main" element={<CartProvider> {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals /> </CartProvider>} />
   
    </Routes>
    </Router>
  );
}

export default App;
