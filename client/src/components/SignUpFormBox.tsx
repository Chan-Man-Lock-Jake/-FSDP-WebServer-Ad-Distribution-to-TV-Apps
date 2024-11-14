import React, { useState } from "react";
import axios from "axios";

const SignUpFormBox: React.FC = () => {
  // Initializing form data state
  const [formData, setFormData] = useState({
    name: "",
    companyNumber: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

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
    console.log("Agree Terms:", agreeTerms);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dynamically generate UserID
    const newUser = {
      UserID: `ACC${Math.floor(1000000 + Math.random() * 9000000)}`, // Corrected to use backticks for template literals
      Username: formData.name,
      UserPassword: formData.password,
      UserCtcNo: formData.companyNumber,
      CompanyName: formData.companyName,
      UserEmail: formData.email,
      UserRole: "User", // Default role
      Company: formData.companyName,
    };

    try {
      // Send user data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/addUser",
        newUser
      );
      alert("User signed up successfully!");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("There was an error signing up. Please try again.");
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-box">
        <h2 className="text-center">Sign Up</h2>
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
              placeholder="Company Contact Number"
              name="companyNumber"
              value={formData.companyNumber}
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
