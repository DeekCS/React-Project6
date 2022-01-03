import React from 'react';
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import style from '../Header/Cart.style';
import Button from '@mui/material/Button';
import { useCart } from 'react-use-cart';
const Profile = (props) => {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let navigate = useNavigate();
  let allUsers = JSON.parse(localStorage.getItem('users'));

  let user = allUsers.find((user) => user.id === loggedUser.id);
  let userName = user.firstName + ' ' + user.lastName;
  let userEmail = user.email;
  let userPassword = user.password;
  let userAppointments = user.appointments;

  const { email, username } = user;

  const localData = JSON.parse(localStorage.getItem('react-use-cart'));
  const { items } = localData;
  const { cartTotal } = localData;
  let { isEmpty } = useCart();
  userAppointments.map((appointment) => {
    let appointmentDate = new Date(appointment.date);
    let appointmentTime = appointmentDate.toLocaleTimeString();
    let appointmentDateFormatted = appointmentDate.toLocaleDateString();
    let appointmentTimeFormatted = appointmentTime.slice(0, 5);
    let appointmentDateTimeFormatted =
      appointmentDateFormatted + ' ' + appointmentTimeFormatted;
    appointment.date = appointmentDateTimeFormatted;
  });
  return (
    <div className="profile" style={style.div}>
      <div className="profile-body">
        <div className="profile-body-left">
          <div className="profile-body-left-header">
            <h2>User Information</h2>
          </div>
          <div className="profile-body-left-body">
            <div className="profile-body-left-body-name">
              <h3>Name:</h3>
              <p>{userName}</p>
            </div>
            <div className="profile-body-left-body-email">
              <h3>Email:</h3>
              <p>{userEmail}</p>
            </div>
            <div className="profile-body-left-body-password">
              <h3>Password:</h3>
              <p>{userPassword}</p>
            </div>
          </div>
        </div>
        <div className={'cart-container'} style={style.div}>
          <div className="cart-title">
            <h2>Your Appointments</h2>
          </div>
          {loggedUser.appointments.length > 0 ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table" style={style.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Service</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Start Time</TableCell>
                    <TableCell align="right">End Time</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell component="th" scope="row">
                        {appointment.service}
                      </TableCell>
                      <TableCell align="right">{appointment.date}</TableCell>
                      <TableCell align="right">
                        {appointment.startTime}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.finishTime}
                      </TableCell>
                      <TableCell align="right">
                        {appointment.totalPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div className="no-appointments">
              <h3>You have no appointments</h3>
            </div>
          )}
        </div>

        <div className={'cart-container'} style={style.div}>
          <div className="cart-title">
            <h2>Your Orders</h2>
          </div>
          {isEmpty ? (
            <div className="no-orders">
              <h3>You have no orders</h3>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="simple table" style={style.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        {item.quantity * item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {isEmpty ? (
            ''
          ) : (
            <div className="total-price">
              <h3>Total Price: {cartTotal}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

/*
* <TableContainer component={Paper}>
          <Table aria-label="simple table" style={CartStyle.table}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right">End Time</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userAppointments.map((appointment) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {appointment.date}
                  </TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                   {appointment.startTime}
                    />
                  </TableCell>
                  <TableCell align="right">
                   {appointment.finishTime}
                  </TableCell>
                  <TableCell align="right">
                    {appointment.finishTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
*
*
* */
