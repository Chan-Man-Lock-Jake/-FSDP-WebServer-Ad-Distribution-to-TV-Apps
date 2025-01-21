import React, { useState } from "react";
import "./LoginForm.css";
import illustrationImage from "../../assets/icons/undraw_digital-artwork_xlmm.svg";
import suaveLogo from "../../assets/icons/suave_logo_bgremoved.svg";
import axios from "axios";

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:3000/user/login",
        {
          Email: email, // Ensure field matches backend expectations
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // To allow cookies (if used for sessions)
        }
      );
  
      // Handle successful login
      if (response.data.success) {
        setMessage("Login successful!");
  
        // Optionally, redirect based on user role
        if (response.data.user.Role === "Admin") {
          window.location.href = "/admin/dashboard"; // Redirect for Admins
        } else if (response.data.user.Role === "Content Creator") {
          window.location.href = "/creator/dashboard"; // Redirect for Content Creators
        } else {
          window.location.href = "/user/dashboard"; // Redirect for standard users
        }
      } else {
        setMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      // Handle login errors
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  

  return (
    <div className="login-page">
      {/* Left Section: Login Form */}
      <div className="login-form-section">
        <div className="logo-container">
          <img src={suaveLogo} alt="Suave Logo" className="suave-logo" />
        </div>
        <div className="login-form-container">
          <h1>Log in to your account</h1>
          <p>Welcome back! Enter your credentials to log in</p>
          {message && (
            <div
              className={`alert ${
                message.includes("successful")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
                <a href="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </a>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group checkbox-container">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-text">
            Don't have an account? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>

      {/* Right Section: Illustration */}
      <div className="illustration-section">
        <h1>Manage and distribute your advertisements with ease</h1>
        <p>Everything you need for seamless ad distribution</p>
        <img
          src={illustrationImage}
          alt="Advertisement Management"
          className="illustration-image"
        />
      </div>
    </div>
  );
};

export default LoginContainer;
