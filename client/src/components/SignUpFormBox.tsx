import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpFormBox: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate from React Router

  // Initializing form data state
  const [formData, setFormData] = useState({
    name: "",
    userCtcNo: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false); // State for terms checkbox
  const [message, setMessage] = useState<string | null>(null); // State for success messages
  const [errors, setErrors] = useState<string[]>([]); // State for validation errors

  // Handle input changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox for terms and conditions
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      Name: formData.name,
      UserCtcNo: formData.userCtcNo,
      CompanyName: formData.companyName,
      Email: formData.email,
      Password: formData.password,
    };

    try {
      // Reset errors before making the request
      setErrors([]);
      setMessage(null);

      // Send user data to the backend
      await axios.post("http://localhost:3000/user/signup", newUser);

      // Show success message briefly
      setMessage("Sign up successful!");

      // Redirect to the home page after 2 seconds
      setTimeout(() => {
        navigate("/"); // Redirect to the home page
      }, 2000);
    } catch (error: any) {
      console.error("Error during signup:", error);

      // Extract validation errors from the backend response
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        setErrors(error.response.data.errors);
      } else {
        setMessage(
          error.response?.data?.message ||
            "There was an error signing up. Please try again."
        );
      }
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-box">
        <h2 className="text-center">Sign Up</h2>

        {/* Display success or error message */}
        {message && <div className="alert alert-info">{message}</div>}

        {/* Display validation errors */}
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Contact Number Field */}
          <div className="form-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Company/Your Contact Number"
              name="userCtcNo"
              value={formData.userCtcNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Name Field */}
          <div className="form-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <input
              type="password"
              className="form-control custom-input"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
              checked={agreeTerms}
              onChange={handleTermsChange}
              required
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I acknowledge and agree to the Terms and Conditions.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 custom-signup-button mt-3"
            disabled={!agreeTerms}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpFormBox;
