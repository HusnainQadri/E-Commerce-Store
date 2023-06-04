import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-row">
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Categories</h3>
          <ul>
            <li>Clothing</li>
            <li>Electronics</li>
            <li>Home & Garden</li>
            <li>Beauty</li>
            <li>Health</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Follow Us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Subscribe</h3>
          <p>Get the latest news and deals</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Husnain's Ecommerce Store. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
