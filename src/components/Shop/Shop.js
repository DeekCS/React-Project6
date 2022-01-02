import React, { useState } from 'react';
import data from '../Cart/Data';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
// import './Shop.css';

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

  return (
    <>
      <form>
        {/*<p className="breadCrump">*/}
        {/*  <Link to="/">Home</Link>/ <Link to="/shop">Shop</Link>*/}
        {/*</p>*/}
        <select
          className="btn btn-primary"
          id="rating-filter"
          value={value}
          onChange={handleChange}
        >
          <option style={{ background: 'white', color: 'black' }} value="Sort">
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
