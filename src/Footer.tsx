import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for internal navigation
import './Footer.css'; // Custom styles for the Footer

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-nav">
        {/* Use Link component to enable client-side routing */}
        <Link to="/faq" className="footer-link">Contact</Link>
        <Link to="/faq" className="footer-link">Support</Link>
        <Link to="/pricing" className="footer-link">Pricing</Link>
      </div>
      <h3 className="footer-title">Get Real <span className="footer-title-highlight">Suave</span> With Us</h3>
      <div className="footer-social-icons">
        <a href="#" className="footer-social-link">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="footer-social-link">
          <i className="fab fa-envelope"></i>
        </a>
        <a href="#" className="footer-social-link">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <div className="footer-copyright">
        © Copyright AIDC GROUP 2024, All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
