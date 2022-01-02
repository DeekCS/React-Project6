import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';

const Cart = () => {
  let {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  //handle custom discount
  const [coupon, setCoupon] = useState('');
  const [subTotal, setSubTotal] = useState(cartTotal);
  const [discount, setDiscount] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(cartTotal);
  const [discountClicked, setDiscountClicked] = useState(false);
  const handleCoupon = (e) => {
    e.preventDefault();
    //save coupon to local storage
    if (coupon === 'DISCOUNT') {
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

  return (
    <div className="cart">
      <h2>Cart</h2>
      {isEmpty ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <p>
            {totalUniqueItems} item(s) - ${cartTotal}
          </p>
          <form onSubmit={handleCoupon}>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button type="submit">Apply</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="btn btn-danger decrease"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-success increase"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>${item.price}</td>
                  <td>${item.quantity * item.price}</td>
                  <td>
                    <button type="button" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          Total: ${cartTotal}
          <br />
          {discountClicked ? (
            <p>
              <br />
              You Save: ${cartTotal - discountedTotal}
              <br />
              Total After Discount: ${subTotal}
            </p>
          ) : null}
          <br />
        </div>
      )}
    </div>
  );
};

export default Cart;
