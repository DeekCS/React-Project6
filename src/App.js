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
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Data from './components/Cart/Data';
import SingleProduct from './components/Product/SingleProduct/SingleProduct';

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

  const [checkedOrder, setCheckedOrder] = useState(false);

  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:name" element={<SingleProduct data={Data} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  checkedOrder={checkedOrder}
                  setCheckedOrder={setCheckedOrder}
                />
              }
            />
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
            <Route
              path="/profile"
              element={
                <Profile
                  checkedOrder={checkedOrder}
                  setCheckedOrder={setCheckedOrder}
                />
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
