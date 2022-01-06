import React from 'react';
import './banner.scss';
import { Link } from 'react-router-dom';
const Banner = () => {
  //hero image with button , grid template
  return (
    <section className="top-banner-section">
      <div className="banner-image-div">
        <img
          className="banner-image"
          src="https://source.unsplash.com/random"
          alt="BannerImage"
        />
      </div>
      <div className="banner-overlay-div" />
      <div className="banner-text-div">
        <span className="banner-text">
          <p className="banner-h1-text">
            Remain relevant in today's technology-driven economy
          </p>
          <p className="banner-body-text">
            Learn how agile can give you a competitive edge.
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
