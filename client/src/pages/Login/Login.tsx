import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import illustrationImage from "../../assets/icons/undraw_digital-artwork_xlmm.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const ErrorPopup = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);

    return (
      <div className={message != null ? `error-message` : ""}>
        <span>{message}</span>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Login successful!");
          // Store user details in localStorage or state
          localStorage.setItem("user", JSON.stringify(data.user));

          // Redirect based on user role
          switch (data.user.Role) {
          case "Admin":
            window.location.href = "/admin/dashboard";
          break;
          case "Content Creator":
            window.location.href = "/creator/dashboard";
            break;
        default:
          window.location.href = "/admin/dashboard";
  }
        // Redirect based on user role
        switch (data.user.Role) {
          case "Admin":
            window.location.href = "/admin/dashboard";
            break;
          case "Content Creator":
            window.location.href = "/creator/dashboard";
            break;
          default:
            window.location.href = "/user/dashboard";
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <section className="login-flow">
      <ErrorPopup />
      <div className="left">
        <form onSubmit={handleSubmit} id="login-form">
          <h1>Log in to your account</h1>
          <span>Welcome back! Enter credentials to log in</span>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="Email"
            id="email"
          />
          <label htmlFor="password">
            Password<a href="">Forgot Password?</a>
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="Password"
            id="password"
          />
          <button type="submit">Login</button>
          <p>
            Don’t have an account? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
      <div className="right">
        <div>
          <h1>Manage and distribute your advertisements with ease</h1>
          <span>Everything you need for seamless ad distribution</span>
          <img
            src={illustrationImage}
            alt="Advertisement Management"
            className="illustration-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;