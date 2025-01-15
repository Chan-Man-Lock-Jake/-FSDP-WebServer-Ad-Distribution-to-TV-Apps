import React, { useState } from "react";
import "../css/LoginForm.css";
import illustrationImage from "../assets/icons/undraw_digital-artwork_xlmm.svg";
import suaveLogo from "../assets/icons/suave_logo_bgremoved.svg";
import axios from "axios";

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/user/login",
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Login successful!");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      {/* Left Section: Login Form */}
      <div className="login-form-section">
        <img src={suaveLogo} alt="Suave Logo" className="suave-logo" />
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
          <form onSubmit={handleSubmit}>
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

