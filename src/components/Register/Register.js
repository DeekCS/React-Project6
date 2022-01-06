import React, { useEffect } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import regLogo from './register-onilne.jpg';

export default function Register({
  userSign,
  userLogin,
  setUserSign,
  setUserLogin,
  setIsSuccess,
  isSuccess,
}) {
  // const navigate = useNavigate();
  const { firstName, lastName, email, password, password2, registered } =
    userSign;

  const users_data = [];

  const handleChange = (e) => {
    setUserSign({
      ...userSign,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validation here

    if (email === '' || password === '' || password2 === '') {
      swal({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return false;
    }
    const user_data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      password2: password2,
      registered: true,
      appointments: [],
    };

    users_data.push(user_data);

    let users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      users = [];
    }

    let userArray = users.filter((user) => user.email === email);
    if (userArray.length > 0) {
      swal({
        title: 'Email already exists',
        text: 'Please try another email',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return false;
    } else {
      if (password !== password2) {
        swal({
          title: 'Password not match',
          text: 'Please try again',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        users.push({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          registered: true,
          appointments: [],
        });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedUser', JSON.stringify(user_data));
        // navigate('/todo');
      }
      setUserSign({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        registered: true,
      });
    }
  };

  return (
    <div className={'big__container'}>
      <div className={'register-img'}>
        <img src={regLogo} alt={'register'} />
      </div>
      <div className="register-container">
        <h1 id="main-title">Sign Up</h1>
        <p id="subtitle">It only takes a minute!</p>
        <form className={'register-form'} onSubmit={onSubmit}>
          <div id="first-name" className="placeholders">
            <label id="pl_first_name" htmlFor="text" className="">
              First name
            </label>
            <input
              required
              id="pl_first_name"
              type="text"
              name="firstName"
              placeholder="Enter your first name..."
              value={firstName}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              <span className="error">
                {firstName.length < 3 &&
                  'First name must be at least 3 characters'}
              </span>
            </small>
          </div>

          <div id="first-name" className="placeholders">
            <label id="pl_last_name" htmlFor="text" className="">
              Last name
            </label>
            <input
              required
              id="pl_last_name"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Enter your Last name..."
            />
            <small className="form-text text-muted">
              <span className="error">
                {lastName.length < 3 &&
                  'Last name must be at least 3 characters'}
              </span>
            </small>
          </div>

          <div id="email" className="placeholders">
            <label id="pl_email" htmlFor="text" className="">
              Email
            </label>
            <input
              required
              id="pl_email"
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={email}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              {email.length > 0 &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
                'Invalid email address'}
            </small>
          </div>

          <div id="password" className="placeholders">
            <label id="pl_password" htmlFor="text" className="">
              Password
            </label>
            <input
              required
              id="pl_password"
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={password}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              {password.length < 8
                ? 'Password must be at least 8 characters'
                : ''}
            </small>
          </div>

          <div id="password" className="placeholders">
            <label id="pl_password" htmlFor="text" className="">
              Re-peat Password
            </label>
            <input
              required
              id="pl_password"
              type="password"
              name="password2"
              placeholder="Enter your password..."
              value={password2}
              onChange={handleChange}
            />
            <small className="form-text text-muted">
              {password !== password2 ? 'Passwords do not match' : ''}
            </small>
          </div>

          <div className="terms-conditions">
            <input required type="checkbox" name="vehicle1" value="Bike" />
            <p id="terms-conditions">
              I have read the terms and conditions of this company and accepted
              the privacy policy.
            </p>
            <p className={'login-btn'}>
              already have an account?
              <Link to="/login">
                <span className="login-link">Login</span>
              </Link>
            </p>
          </div>

          <br />

          <button id="a-submit">Register</button>
        </form>
      </div>
    </div>
  );
}
