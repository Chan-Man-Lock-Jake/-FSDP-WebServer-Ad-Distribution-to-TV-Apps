import React from 'react';
import './Footer.css'; // Custom styles for the footer

const Footer: React.FC = () => {
  return (
    <footer className="footer-section text-center mt-5">
      <div className="container">
        <nav className="footer-nav">
          <a href="#contact">Contact</a>
          <a href="#support">Support</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <p className="my-3">Get Real <span className="highlight">Suave</span> With Us</p>
        <p>© Copyright AIDC GROUP 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
