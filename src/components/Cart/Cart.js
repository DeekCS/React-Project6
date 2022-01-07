import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Input, Tooltip } from '@mui/material';
import swal from 'sweetalert';
import CartStyle from '../Header/Cart.style';
import { Link } from 'react-router-dom';

const Cart = () => {
  let {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

  const [coupon, setCoupon] = useState('');
  const [subTotal, setSubTotal] = useState(cartTotal);
  const [discount, setDiscount] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(cartTotal);
  const [discountClicked, setDiscountClicked] = useState(false);
  const handleCoupon = (e) => {
    e.preventDefault();

    if (coupon === '') {
      swal('Oops!', 'Please enter a coupon code', 'error').then((_) => {
        setCoupon('');
      });
      return false;
    }
    if (coupon.toLowerCase() === 'OCA-20') {
      setDiscount(0.1);
      setDiscountedTotal(cartTotal * 0.9);
      setSubTotal(cartTotal * 0.9);
      setDiscountClicked(true);
      localStorage.getItem('react-use-cart') &&
        localStorage.setItem(
          'react-use-cart',
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('react-use-cart')),
            discount: 0.1,
            cartTotal: cartTotal * 0.9,
          })
        );
    } else {
      swal('Invalid Coupon', 'Please enter a valid coupon code', 'error').then(
        () => setCoupon('')
      );
      setDiscount(0);
      setDiscountedTotal(cartTotal);
      setSubTotal(cartTotal);
      setDiscountClicked(false);
    }
  };

  useEffect(() => {
    if (discountClicked) {
      setDiscountedTotal(cartTotal * 0.9);
      setSubTotal(cartTotal * 0.9);
      localStorage.getItem('react-use-cart') &&
        localStorage.setItem(
          'react-use-cart',
          JSON.stringify({
            ...JSON.parse(localStorage.getItem('react-use-cart')),
            discount: 0.1,
            cartTotal: cartTotal * 0.9,
          })
        );
    } else {
      setDiscountedTotal(cartTotal);
      setSubTotal(cartTotal);
    }
  }, [discountClicked, cartTotal]);

  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((r) => {
      if (r) {
        removeItem(id);
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
        }).then(
          () =>
            localStorage.getItem('react-use-cart') &&
            localStorage.setItem(
              'react-use-cart',
              JSON.stringify({
                ...JSON.parse(localStorage.getItem('react-use-cart')),
                cartTotal: cartTotal - items[id].price,
              })
            )
        );
      } else {
        swal('Your imaginary file is safe!').then(
          () =>
            localStorage.getItem('react-use-cart') &&
            localStorage.setItem(
              'react-use-cart',
              JSON.stringify({
                ...JSON.parse(localStorage.getItem('react-use-cart')),
                cartTotal: cartTotal,
              })
            )
        );
      }
    });
  };

  const handleClearCart = (products) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((r) => {
      if (r) {
        emptyCart();
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
        }).then(
          () =>
            localStorage.getItem('react-use-cart') &&
            localStorage.setItem(
              'react-use-cart',
              JSON.stringify({
                ...JSON.parse(localStorage.getItem('react-use-cart')),
                cartTotal: 0,
              })
            )
        );
      } else {
        swal('Your imaginary file is safe!').then(
          () =>
            localStorage.getItem('react-use-cart') &&
            localStorage.setItem(
              'react-use-cart',
              JSON.stringify({
                ...JSON.parse(localStorage.getItem('react-use-cart')),
                cartTotal: cartTotal,
              })
            )
        );
      }
    });
  };

  return (
    <div className={'cart-container'} style={CartStyle.div}>
      <div className="cart-title">
        <h2>Cart</h2>
      </div>
      {isEmpty ? (
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table" style={CartStyle.table}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemQuantity(item.id, e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    {item.quantity * item.price}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button>
            <Link to="/checkout">Checkout</Link>
          </Button>
          <Button onClick={() => handleClearCart(items)}>Clear Cart </Button>
        </TableContainer>
      )}
      {isEmpty ? (
        ''
      ) : (
        <div>
          <p>
            {totalUniqueItems} item(s) - ${cartTotal}
          </p>
          <form onSubmit={handleCoupon}>
            <input
              type="text"
              value={coupon}
              placeholder="Enter a coupon code"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button type="submit">Apply</button>
          </form>
          Total: ${cartTotal}
          <br />
          {discountClicked ? (
            <p>
              You Save: ${cartTotal - discountedTotal}
              <br />
              Total After Discount: ${subTotal}
            </p>
          ) : null}
          <br />
        </div>
      )}
      <Link to="/shop">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
