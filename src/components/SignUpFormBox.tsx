import React from 'react';

const SignUpFormBox: React.FC = () => {
  return (
    <div className="signup-form-container">
      <div className="signup-form-box">
        <h2 className="text-center">Sign Up</h2>
        <form>
          <div className="form-group">
            <input type="text" className="form-control custom-input" placeholder="Name" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-control custom-input" placeholder="Company Number" required />
          </div>
          <div className="form-group">
            <input type="email" className="form-control custom-input" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control custom-input" placeholder="Password" required />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="termsCheck" required />
            <label className="form-check-label" htmlFor="termsCheck">
              I acknowledge and agree to the Terms and Conditions.
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100 custom-signup-button mt-3" disabled>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpFormBox;
