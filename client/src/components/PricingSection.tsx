import React from 'react';
import PricingCard from './PricingCard';
import '../css/Pricing.css';

const PricingSection: React.FC = () => {
  return (
    <section className="pricing-section">
      <h2 className="text-center pricing-title">Pricing</h2>
      <p className="text-center pricing-subtitle">
        Flexible Pricing Plans to Suit Your Advertising Needs
      </p>
      <div className="pricing-cards-container">
        <PricingCard
          title="Regular"
          price="$40"
          benefits={["Benefit 1", "Benefit 2", "Benefit 3"]}
        />
        <PricingCard
          title="Pro"
          price="$80"
          benefits={["Benefit 1", "Benefit 2", "Benefit 3"]}
        />
      </div>
    </section>
  );
};

export default PricingSection;