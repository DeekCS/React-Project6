import React from 'react';
import './login.css';

import swal from 'sweetalert';
import regLogo from '../Register/register-onilne.jpg';
import { Link } from 'react-router-dom';

const Login = ({ userLogin, setUserLogin, isSuccess }) => {
  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userLogin = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    let storage = JSON.parse(localStorage.getItem('users'));

    if (userLogin.email === '' || userLogin.password === '') {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the fields!',
      });
      return false;
    }
    if (storage) {
      storage.forEach((user) => {
        if (
          user.email === userLogin.email &&
          user.password === userLogin.password
        ) {
          isSuccess = true;
          console.log('Login success');
          localStorage.setItem('loggedUser', JSON.stringify(user));
          // navigate('/todo');
        }
      });
    }
    if (isSuccess) {
      setUserLogin(userLogin);
    } else {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or password is incorrect!',
      });
    }
  };

  return (
    <div className="big__container">
      <div className={'register-img'}>
        <img src={regLogo} alt={'register'} />
      </div>
      <div className="register-container">
        <h1 id="main-title">Login</h1>
        <p id="subtitle">Welcome Again!</p>
        <form className={'register-form'} onSubmit={handleSubmit}>
          <div className="placeholders">
            <label id="pl_first_name" htmlFor="text" className="">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              onChange={handleChange}
            />
          </div>
          <div className="placeholders">
            <label htmlFor="text" className="">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              onChange={handleChange}
            />
          </div>
          <p className={'login-btn'}>
            Don't have an account?
            <Link to="/register">
              <span className="login-link">Register</span>
            </Link>
          </p>
          <button id="a-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
