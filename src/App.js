import Register from './components/Register/Register';
import './App.css';
import React, { useState } from 'react';
import Login from './components/Login/Login';
// import Product from './components/Product/Product';
import { CartProvider, useCart } from 'react-use-cart';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';

function App() {
  const [userSign, setUserSign] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    registered: false,
  });
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="App">
      <CartProvider>
        <Shop />
        <Register userSign={userSign} setUserSign={setUserSign} />
        <Login userLogin={userLogin} setUserLogin={setUserLogin} />
        <Cart />
      </CartProvider>
    </div>
  );
}

export default App;
