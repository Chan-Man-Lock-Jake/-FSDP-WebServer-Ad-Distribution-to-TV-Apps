import React from 'react';
import PricingCard from './PricingCard';
import '../css/Pricing.css';

const PricingSection: React.FC = () => {
  return (
    <section className="pricing-section">
      <h2 className="text-center pricing-title">Pricing</h2>
      <p className="text-center pricing-subtitle">Flexible Pricing Plans to Suit Your Advertising Needs</p>
      <div className="pricing-cards-container d-flex justify-content-center">
        <PricingCard title="Regular" price="$40" benefits={["benefit 1", "benefit 2", "benefit 3"]} />
        <PricingCard title="Pro" price="$80" benefits={["benefit 1", "benefit 2", "benefit 3", "benefit 4"]} />
      </div>
    </section>
  );
};

export default PricingSection;
