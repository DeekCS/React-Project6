import React from 'react';
import './cart_icon.scss';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
const CartIcon = () => {
  let { totalItems } = useCart();
  return (
    totalItems > 0 && (
      <Link to="/cart">
        <div className="cart">
          <span className="count">{totalItems}</span>
          <i className="fas fa-shopping-cart material-icons" />
        </div>
      </Link>
    )
  );
};

export default CartIcon;
