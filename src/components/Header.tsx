import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Header.css'; // Custom styles for Header

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top custom-navbar">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">Logo</Link>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Buttons */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="btn btn-dark me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-dark" to="/signup">Join Us</Link>
            <Link className="btn btn-outline-dark" to="/admin-management">SystemAdminManagement</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
