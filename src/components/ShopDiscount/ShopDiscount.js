import React from 'react';
import './shopDiscount.scss';

const ShopDiscount = (props) => {
  return (
    <div className="shop-container">
      <div className="shop-overlay">
        <div className="shop-content">
          <h4>Shop</h4>
          <p>Try Code (OCA-22) and get 10% Discount!</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDiscount;
