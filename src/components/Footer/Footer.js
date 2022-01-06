import React from 'react';
import './footer.scss';

const Footer = () => (
  <>
    <footer>
      <div className="inner-footer">
        <div className="footer-items">
          <h1>Sky Tech</h1>
        </div>

        <div className="social-media">
          <a href="https://instagram.com/deek99">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://facebook.com/Abood.Aldeek.CS">
            <i className="fab fa-facebook" />
          </a>
          <a href="https://linkedin.com/in/abdelkarim.aldeek">
            <i className="fab fa-linkedin" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright &copy; Sky Tech {new Date().getFullYear()} | Developed By
        Abdulkareem Aldeek
      </div>
    </footer>
  </>
);

export default Footer;
