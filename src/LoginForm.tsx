import React from 'react';
import placeholderImage from '../public/placeholderimage.jpg'; // Placeholder image
import './LoginForm.css'; // Custom styles for the LoginForm

const LoginForm: React.FC = () => {
  return (
    <div className="login-page-container d-flex">
      {/* Left Side - Placeholder Image */}
      <div className="placeholder-image-container">
        <img src={placeholderImage} alt="Placeholder" className="placeholder-image" />
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-container">
        <div className="login-form-box">
          <h2 className="text-center">Login</h2>
          <form>
            <div className="form-group">
              <input
                type="email"
                className="form-control custom-input"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control custom-input"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 custom-login-button"
              disabled
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
