import React from "react";
import "../css/LandingPage.css";

const Hero: React.FC = () => {
  return (
    <div className="landing-page">
      {/* TV Section */}
      <section className="tv-section">
        <div className="tv-container">
          <div className="tv-screen">
            <h1>Elevate Your Brand with Suave Ad Solutions</h1>
            <p>Manage, customize, and deliver your advertisements seamlessly across TVs!</p>
            <button className="get-started-btn">Get Started</button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel">
        <div className="carousel-item">
          <img src="/path-to-first-image.jpg" alt="Home" />
        </div>
        <div className="carousel-item">
          <img src="/path-to-second-image.jpg" alt="Campaign" />
        </div>
        <div className="carousel-item">
          <img src="/path-to-third-image.jpg" alt="Advertisement" />
        </div>
      </section>

      {/* Unified Platform Section */}
      <section className="unified-platform-section">
        <div className="platform-content">
          <h2>A Unified Platform for All Your Advertisement Needs</h2>
          <button className="start-free-trial-btn">Start Free Trial</button>
          <ul className="platform-features">
            <li>
              <h3>Multi-Level Access Management</h3>
              <p>Manage users efficiently with advanced role-based access control.</p>
            </li>
            <li>
              <h3>Dynamic Ad Distribution</h3>
              <p>Distribute ads dynamically across targeted channels for maximum reach.</p>
            </li>
            <li>
              <h3>Customizable Elements</h3>
              <p>Tailor your ads with customizable templates and intuitive design tools.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Suave Ad Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Hero;
