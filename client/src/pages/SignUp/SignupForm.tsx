import React, { useState } from "react";
import suaveLogo from "../../assets/icons/suave_logo_bgremoved.svg";
import illustrationImage from "../../assets/icons/undraw_digital-artwork_xlmm.svg";
import axios from "axios";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userId = `U${Math.floor(Math.random() * 100000)}`; // Simulate user ID
    const createdAt = new Date().toISOString();
  
    const user = {
      UserId: userId, // Changed to match database format
      Email: email,   // Match PascalCase
      Name: name,     // Match PascalCase
      Password: password, // Match PascalCase
      Role: role,     // Match PascalCase
      CreatedAt: createdAt, // Match PascalCase
    };
  
    try {
      await axios.post("http://localhost:3000/user/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("Signup successful!");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };
  

  return (
    <div className="signup-page">
      <div className="signup-form-section">
        <div className="signup-logo-container">
          <img src={suaveLogo} alt="Suave Logo" className="signup-logo" />
        </div>
        <div className="signup-form-container">
          <h1>Sign Up for an Account</h1>
          <p>Create your account by entering your details below.</p>
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
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="Content Creator">Content Creator</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <p className="signup-text">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
      <div className="illustration-section">
        <h1>Manage your account and content with ease</h1>
        <p>Seamlessly create, manage, and distribute content across platforms.</p>
        <img
          src={illustrationImage}
          alt="Signup Illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
};

export default SignupForm;
