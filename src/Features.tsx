import React from 'react';
import placeholderImage from '../public/placeholderimage.jpg'; // Replace with your actual placeholder

const Features: React.FC = () => {
  return (
    <section className="features-section my-5">
      <h2 className="text-center mb-5">Streamline Your Advertising Process</h2>

      {/* Feature 1: Dynamic Ad Templates */}
      <div className="feature-container my-5">
        <div className="feature-content d-flex flex-column flex-lg-row align-items-center">
          <div className="feature-image">
            <img src={placeholderImage} alt="Ad Templates Placeholder" className="img-fluid" />
          </div>
          <div className="feature-description ms-lg-5 mt-4 mt-lg-0">
            <h3>Dynamic Ad Templates</h3>
            <p>Manage and customize ad templates for your brand.</p>
            <button className="btn btn-outline-dark mt-2">Get a Sample</button>
          </div>
        </div>
      </div>

      {/* Feature 2: Real-Time Distribution */}
      <div className="feature-container my-5">
        <div className="feature-content d-flex flex-column flex-lg-row align-items-center">
          <div className="feature-description me-lg-5 mt-4 mt-lg-0">
            <h3>Real-Time Distribution</h3>
            <p>Deliver ads seamlessly across all TV apps.</p>
          </div>
          <div className="feature-image">
            <img src={placeholderImage} alt="Real Time Distribution Placeholder" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* Feature 3: Comprehensive Analytics */}
      <div className="feature-container my-5">
        <div className="feature-content d-flex flex-column flex-lg-row align-items-center">
          <div className="feature-image">
            <img src={placeholderImage} alt="Comprehensive Analytics Placeholder" className="img-fluid" />
          </div>
          <div className="feature-description ms-lg-5 mt-4 mt-lg-0">
            <h3>Comprehensive Analytics</h3>
            <p>Track the performance of your ad campaigns.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
