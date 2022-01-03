import Register from './components/Register/Register';
import './App.css';
import React, { useState } from 'react';
import Login from './components/Login/Login';
import { CartProvider, useCart } from 'react-use-cart';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Services from './components/Services/Services';

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
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/register"
              element={
                <Register userSign={userSign} setUserSign={setUserSign} />
              }
            />
            <Route
              path="/login"
              element={
                <Login userLogin={userLogin} setUserLogin={setUserLogin} />
              }
            />
            <Route path="/services" element={<Services />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
