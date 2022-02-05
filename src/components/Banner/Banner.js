import React from 'react';
import './banner.scss';
import { Link } from 'react-router-dom';
const Banner = () => {
  return (
    <section className="top-banner-section">
      <div className="banner-image-div"></div>
      <div className="banner-overlay-div" />
      <div className="banner-text-div">
        <span className="banner-text">
          <p className="banner-h1-text">SKY TECH FOR GAMING PC</p>
          <p className="banner-body-text">
            Sky Tech is a leading provider of Technical Supporter and PC
            hardware's in Jordan.
          </p>
          <p className="banner-btn">
            <Link to="/shop" className="banner-btn-item">
              Get started &#8594;
            </Link>
          </p>
        </span>
      </div>
    </section>
  );
};

export default Banner;
