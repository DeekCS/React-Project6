import React, { useEffect } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

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
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-2 text-center">Sign Up</h1>
            <p className="lead text-center">Create your account</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Fisrt Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  {email.length > 0 &&
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
                    'Invalid email address'}
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  {password.length < 8
                    ? 'Password must be at least 8 characters'
                    : ''}
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
                <small className="form-text text-muted">
                  {password !== password2 ? 'Passwords do not match' : ''}
                </small>
              </div>
              <input type="submit" className="btn btn-info  mt-4" />
            </form>
            {/*already have an account? <Link to="/login">Login</Link>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
