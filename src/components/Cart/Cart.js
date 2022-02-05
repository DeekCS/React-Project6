import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import './cart.scss';
import Button from '@mui/material/Button';
const Cart = ({ checkedOrder, setCheckedOrder }) => {
  const navigate = useNavigate();
  let {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
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
    console.log(coupon);
    if (coupon === '') {
      swal('Oops!', 'Please enter a coupon code', 'error').then((_) => {
        setCoupon('');
      });
      return false;
    }
    if (coupon.toLowerCase() === 'oca-22') {
      console.log('coupon applied');
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

  const checkout = () => {
    setCheckedOrder(true);

    swal({
      title: 'Are you sure?',
      text: 'Once checked sure, you will not be able to undo this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((r) => {
      if (r) {
        const localData = JSON.parse(localStorage.getItem('react-use-cart'));

        const { items } = localData;

        const orders = [];

        orders.push(items);

        if (!localStorage.getItem('orders')) {
          localStorage.setItem('orders', JSON.stringify(orders));
        } else {
          const newOrders = JSON.parse(localStorage.getItem('orders'));
          orders.push(...newOrders);
          localStorage.setItem('orders', JSON.stringify(orders));
        }
        swal('Checked out!', {
          icon: 'success',
        }).then(() => {
          emptyCart(items);
          navigate('/profile');
        });
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

  useEffect(() => {
    document.title = `Sky Tech | Cart`;
  }, []);

  return (
    <>
      <div className="wrap">
        <header className="cart-header cf">
          <strong>{totalUniqueItems} Item(s) in Your Cart</strong>
          {isEmpty ? (
            ''
          ) : (
            <span className="btn" onClick={checkout}>
              Checkout
            </span>
          )}
        </header>
        <div className="cart-table">
          {isEmpty ? (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <p>
                You have no items in your shopping cart.
                <br />
                <Button onClick={() => navigate('/shop')}>
                  Continue Shopping
                </Button>
              </p>
            </div>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li className="item" key={index}>
                  <div className="item-main cf">
                    <div className="item-block ib-info cf">
                      <img
                        className="product-img"
                        src={item.image}
                        alt="Product"
                      />
                      <div className="ib-info-meta">
                        <span className="title">{item.name}</span>
                        <span className="itemno">#{item.id}</span>
                      </div>
                    </div>
                    <div className="item-block ib-qty">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItemQuantity(item.id, e.target.value)
                        }
                        className="qty"
                      />
                      <span className="price">
                        <span>x</span> ${item.price}
                      </span>
                    </div>
                    <div className="item-block ib-total-price">
                      <span className="tp-price">
                        ${item.quantity * item.price}
                      </span>
                      <span className="tp-remove">
                        <i className="i-cancel-circle"></i>
                      </span>
                    </div>
                  </div>
                  <div className="item-foot cf">
                    <div className="if-left">
                      <span className="if-status">In Stock</span>
                    </div>
                    <div className="if-right"></div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isEmpty ? (
          ''
        ) : (
          <div className="sub-table cf">
            <div className="summary-block">
              <div className="sb-promo">
                <input
                  type="text"
                  value={coupon}
                  placeholder="Enter a coupon code"
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <span className="btn" onClick={handleCoupon}>
                  Apply
                </span>
              </div>
              <ul>
                <li className="subtotal">
                  <span className="sb-label">Total</span>
                  <span className="sb-value"> ${cartTotal}</span>
                </li>
                {discountClicked ? (
                  <>
                    <li className="shipping">
                      <span className="sb-label">You Save </span>
                      <span className="sb-value">
                        ${cartTotal - discountedTotal}
                      </span>
                    </li>
                    <li className="tax">
                      <span className="sb-label">Total After Discount </span>
                      <span className="sb-value">${subTotal}</span>
                    </li>
                    <li className="tax-calculate">
                      <input type="text" value="06484" className="tax" />
                      <span className="btn">Calculate</span>
                    </li>
                    <li className="grand-total">
                      <span className="sb-label">Total</span>
                      <span className="sb-value">${subTotal}</span>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
            <div className="copy-block">
              <p>
                Items will be saved in your cart for 30 days. To save items
                longer, add them to your <a href="#">Wish List</a>.
              </p>
              <p className="customer-care">
                Call us M-F 8:00 am to 6:00 pm EST
                <br />
                (877)-555-5555 or <a href="#">contact us</a>. <br />
              </p>
            </div>
          </div>
        )}
        {isEmpty ? (
          ''
        ) : (
          <div className="cart-footer cf">
            <span className="btn" onClick={handleClearCart}>
              Clear Cart
            </span>
            <span className="cont-shopping" onClick={() => navigate('/shop')}>
              <i className="i-angle-left"></i>Continue Shopping
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
/*

 */
