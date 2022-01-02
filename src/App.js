import Register from './components/Register/Register';
import './App.css';
import React, { useState } from 'react';
import Login from './components/Login/Login';
// import Login from './components/Login/Login';

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
      <Register userSign={userSign} setUserSign={setUserSign} />
      <Login userLogin={userLogin} setUserLogin={setUserLogin} />
    </div>
  );
}

export default App;
