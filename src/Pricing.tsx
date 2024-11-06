import React from 'react';
import './Pricing.css'; // Custom styles for the Pricing page

const Pricing: React.FC = () => {
  return (
    <section className="pricing-section">
      <h2 className="text-center pricing-title">Pricing</h2>
      <p className="text-center pricing-subtitle">Flexible Pricing Plans to Suit Your Advertising Needs</p>

      <div className="pricing-cards-container d-flex justify-content-center">
        {/* Regular Plan */}
        <div className="pricing-card">
          <h3 className="pricing-plan-title">Regular</h3>
          <p className="pricing-plan-price">
            <span className="price-amount">$40</span> / month
          </p>
          <button className="btn btn-outline-dark w-100 my-3">Sign Up</button>
          <ul className="benefits-list">
            <li>✔ benefit</li>
            <li>✔ benefit</li>
            <li>✔ benefit</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card">
          <h3 className="pricing-plan-title">Pro</h3>
          <p className="pricing-plan-price">
            <span className="price-amount">$80</span> / month
          </p>
          <button className="btn btn-outline-dark w-100 my-3">Sign Up</button>
          <ul className="benefits-list">
            <li>✔ benefit</li>
            <li>✔ benefit</li>
            <li>✔ benefit</li>
            <li>✔ benefit</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
