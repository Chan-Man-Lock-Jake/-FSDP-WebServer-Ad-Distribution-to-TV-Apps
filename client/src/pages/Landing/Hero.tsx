import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Hero.css";
import nycBill from "../../assets/nycBill.jpg";
import tempImg1 from "../../assets/placeholderimage.jpg"
import tempImg2 from "../../assets/PlaceHolder2.png"
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const sliderSettings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides visible
    slidesToScroll: 1, // Number of slides to scroll at once
    arrows: false, // Hide arrow navigation
    autoplay: true, // Automatically slide
    autoplaySpeed: 3000, // Delay between slides
  };

  return (
    <div className="landing-page">
      {/* TV Section */}
      <section className="tv-section">
        <div className="tv-container">
          <div className="tv-screen">
            <h1 className="tv-title">Elevate Your Brand with Suave Ad Solutions</h1>
            <p className="tv-description">
              Manage, customize, and deliver your advertisements seamlessly across TVs!
            </p>
            <button className="get-started-btn">
      <Link to="/pricing" style={{ textDecoration: "none", color: "inherit" }}>
        Get Started
      </Link>
    </button>
          </div>
          <div className="tv-stand"></div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <Slider {...sliderSettings}>
          <div className="carousel-item">
            <img src={nycBill} alt="Home" />
          </div>
          <div className="carousel-item">
            <img src={tempImg1} alt="Campaign" />
          </div>
          <div className="carousel-item">
            <img src={tempImg2} alt="Advertisement" />
          </div>
        </Slider>
      </section>

      {/* Unified Platform Section */}
      <section className="unified-platform-section">
  <div className="platform-content">
    {/* Left Section */}
    <div className="platform-left">
      <h2 className="platform-title">A Unified Platform for All Your Advertisement Needs</h2>
      <button className="start-free-trial-btn">
      <Link to="/pricing" style={{ textDecoration: "none", color: "inherit" }}>
      Start Free Trial
      </Link></button>
    </div>
    {/* Right Section */}
    <div className="platform-right">
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
  </div>
</section>

    </div>
  );
};

export default Hero;
