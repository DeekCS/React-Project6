import React, { useState } from 'react';
import data from '../Cart/Data';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './shop.css';
import CartIcon from '../CartIcon/CartIcon';
const Shop = () => {
  const [value, setValue] = useState('');
  const [newData, setNewData] = useState(data);

  const handleChange = (e) => {
    setValue(e.target.value);
    switch (e.target.value) {
      case 'Low price':
        setNewData(data.sort((a, b) => (a.price > b.price ? 1 : -1)));
        break;
      case 'High price':
        setNewData(data.sort((a, b) => (b.price > a.price ? 1 : -1)));

        break;

      default:
        setNewData(data);
        break;
    }
  };

  //search for product
  const searchProduct = (e) => {
    e.preventDefault();
    const search = value.toLowerCase();
    const newData = data.filter((product) => {
      return product.name.toLowerCase().includes(search);
    });
    setNewData(newData);
  };

  return (
    <>
      <CartIcon />

      <div className="services-container">
        <div className="services-overlay">
          <div className="services-content">
            <h4>Shop</h4>
            <p>Try Code (OCA-22) and get 10% Discount!</p>
          </div>
        </div>
        <div className={'forms-div'}>
          <form onSubmit={searchProduct} className={'search-product'}>
            <input
              type="text"
              placeholder="Search for product"
              value={value}
              onChange={handleChange}
            />
          </form>
          <form className={'filters-form'}>
            <select id="product-filter" value={value} onChange={handleChange}>
              <option
                style={{ background: 'white', color: 'black' }}
                value="Sort"
              >
                Sort
              </option>
              <option
                style={{ background: 'white', color: 'black' }}
                value="Low price"
              >
                Low price
              </option>
              <option
                style={{ background: 'white', color: 'black' }}
                value="High price"
              >
                High price
              </option>
            </select>
          </form>
        </div>
      </div>
      <div className="showProduct">
        {newData.map((item, id) => (
          <Product
            src={item.image}
            alt={item.name}
            productName={item.name}
            productInfo={item.description}
            price={item.price}
            item={item}
            key={id}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
};
export default Shop;
