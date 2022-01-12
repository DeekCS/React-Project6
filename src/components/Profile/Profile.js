import React, { useEffect } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
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

const Profile = ({ checkedOrder, setCheckedOrder }) => {
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  let navigate = useNavigate();
  let allUsers = JSON.parse(localStorage.getItem('users'));
  const currentOrder = JSON.parse(localStorage.getItem('orders'));

  let user = allUsers.find((user) => user.id === loggedUser.id);
  let userName = user.firstName + ' ' + user.lastName;
  let userEmail = user.email;
  let userPassword = user.password;
  let userAppointments = user.appointments;

  const logout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('react-use-cart');
    navigate('/');
  };

  useEffect(() => {
    if (!loggedUser) {
      navigate('/');
    }
  }, [loggedUser, navigate]);

  const localData = JSON.parse(localStorage.getItem('react-use-cart'));
  const { items } = localData;
  const { cartTotal } = localData;
  let { isEmpty } = useCart();
  userAppointments.map((appointment) => {
    let appointmentDate = new Date(appointment.date);
    let appointmentTime = appointmentDate.toLocaleTimeString();
    let appointmentDateFormatted = appointmentDate.toLocaleDateString();
    let appointmentTimeFormatted = appointmentTime.slice(0, 5);
    appointment.date =
      appointmentDateFormatted + ' ' + appointmentTimeFormatted;

    return appointment;
  });

  const renderOrder = () => {
    let total = 0;
    return currentOrder.map((item, index) => {
      total = 0;
      return (
        <>
          <Table aria-label="simple table" style={style.table}>
            <TableHead>
              <TableRow key={index}>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>

            {item.map((order, index) => {
              const { quantity, price } = order;
              total += price * quantity;
              return (
                <TableBody>
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {order.name}
                    </TableCell>
                    <TableCell align="right">{order.price}</TableCell>
                    <TableCell align="right">{order.quantity}</TableCell>
                    <TableCell align="right">
                      {order.quantity * order.price}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
          <div
            className="total-price"
            style={{
              marginBottom: '1.2rem',
              padding: '0.8rem',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <h3>Total Price: {total}</h3>
          </div>
        </>
      );
    });
  };
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
            <div className={'logout'}>
              <Button variant="contained" color="primary" onClick={logout}>
                Logout
              </Button>
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
          <div className="cart-title" style={{ marginBottom: '1.2rem' }}>
            <h2>Your Orders</h2>
          </div>

          <TableContainer component={Paper}>
            {checkedOrder ? (
              renderOrder()
            ) : (
              <div className="no-orders">
                <h3>You have no orders</h3>
              </div>
            )}
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Profile;
