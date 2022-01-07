import React from 'react';
import './SingleProduct.css';
import { useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useCart } from 'react-use-cart';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

const SingleProduct = ({ data }) => {
  const { name } = useParams();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product);
    swal({
      title: 'Added to cart',
      text: `${product.name} has been added to your cart`,
      icon: 'success',
      button: false,
      timer: 1000,
    });
  };

  return (
    <div className={'single-product_container'}>
      {data
        .filter((item) => item.name === name)
        .map((item) => (
          <>
            <div className="card-wrapper" key={item.name}>
              <div className="card-single-product">
                <div className="product-imgs">
                  <div className="img-display">
                    <div className="breadcrumb">
                      <Link to="/">Home</Link>
                      <span> / </span>
                      <Link to="/shop">Shop</Link>
                      <span> / </span>
                      <span>{name}</span>
                    </div>
                    <div className="img-showcase">
                      <InnerImageZoom src={item.image} zoomSrc={item.image} />
                    </div>
                  </div>
                </div>
                <div className="product-content">
                  <Link to={'/shop'} className="product-link">
                    visit store
                  </Link>

                  <div className="product-price">
                    <p className="new-price">
                      Price: <span>${item.price} </span>
                    </p>
                  </div>

                  <div className="product-detail">
                    <h2>about this item: </h2>
                    <p>{item.description}</p>
                    <ul>
                      <li>
                        Available: <span>in stock</span>
                      </li>
                      <li>
                        Shipping Area: <span>All over the world</span>
                      </li>
                      <li>
                        Shipping Fee: <span>Free</span>
                      </li>
                      <div className="product-rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        <span>4.7(21)</span>
                      </div>
                    </ul>
                  </div>

                  <div className="purchase-info">
                    <button
                      onClick={() => handleAddToCart(item)}
                      type="button"
                      className="btn"
                    >
                      Add to Cart <i className="fas fa-shopping-cart" />
                    </button>
                  </div>

                  <div className="social-links">
                    <p>Share At: </p>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fab fa-whatsapp" />
                    </a>
                    <a href="#">
                      <i className="fab fa-pinterest" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default SingleProduct;
