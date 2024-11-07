import React from 'react';

const LoginFormBox: React.FC = () => {
  return (
    <div className="login-form-container">
      <div className="login-form-box">
        <h2 className="text-center">Login</h2>
        <form>
          <div className="form-group">
            <input type="email" className="form-control custom-input" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control custom-input" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-primary w-100 custom-login-button" disabled>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginFormBox;
