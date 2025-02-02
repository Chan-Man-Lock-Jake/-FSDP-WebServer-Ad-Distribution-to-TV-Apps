import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  benefits: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, benefits }) => {
  return (
    <div className="pricing-card">
      <h3 className="pricing-plan-title">{title}</h3>
      <p className="pricing-plan-price">
        <span className="price-amount">{price}</span> / month
      </p>
      <button className="btn btn-primary w-100 my-3 py-2 fw-bold">Get Started</button>
      <ul className="benefits-list">
        {benefits.map((benefit, index) => (
          <li key={index}>
            <span>✔</span> {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;