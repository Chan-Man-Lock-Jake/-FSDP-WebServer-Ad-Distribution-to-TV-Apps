import React, { useState } from "react";
import axios from "axios";

const LoginFormBox: React.FC = () => {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null); // State for success/error messages

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        {
          Email: email, // Ensure this field matches the backend key
          Password: password, // Ensure this field matches the backend key
        },
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set the content type
          },
        }
      );

      // Show success message
      setMessage("Login successful!");
      console.log("Login response:", response.data);
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-box">
        <h2 className="text-center">Login</h2>

        {/* Display success or error messages */}
        {message && (
          <div
            className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"}`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <input
              type="password"
              className="form-control custom-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 custom-login-button"
            disabled={!email || !password} // Disable button if inputs are empty
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginFormBox;
