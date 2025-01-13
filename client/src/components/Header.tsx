import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // Ensure this matches the CSS file's location

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <img src="/assets/icons/suave_logo_bgremoved.svg" alt="Suave Logo" className="logo-image" />
        </div>

        {/* Navigation Links */}
        <nav className="header-navigation">
          <Link to="/features" className="header-nav-link">Features</Link>
          <Link to="/company" className="header-nav-link">Company</Link>
          <Link to="/pricing" className="header-nav-link">Pricing</Link>
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          <button className="header-button request-demo">Request Demo</button>
          <button className="header-button login">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
