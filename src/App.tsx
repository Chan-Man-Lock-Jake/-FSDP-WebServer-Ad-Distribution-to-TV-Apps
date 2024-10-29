import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Home from './Home';
import Features from './Features';
import Pricing from './Pricing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Assuming you have global styles here

const App: React.FC = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navbar navbar-default navbar-expand-lg fixed-top custom-navbar">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon ion-md-menu"></span>
        </button>
        <img src="src/assets/react.svg" className="img-fluid nav-logo-mobile" alt="Company Logo" />
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <div className="container">
            <img src="assets/react.svg" className="img-fluid nav-logo-desktop" alt="Company Logo" />
            <ul className="navbar-nav ml-auto nav-right">
              <li className="nav-item nav-custom-link">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item nav-custom-link">
                <Link className="nav-link" to="/Features">Features</Link>
              </li>
              <li className="nav-item nav-custom-link">
                <Link className="nav-link" to="/Pricing">Pricing</Link>
              </li>
              <li className="nav-item nav-custom-link">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes to Handle Navigation */}
      <Routes>
        {/* Default Route - Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login and Sign Up Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Other Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
};

export default App;
