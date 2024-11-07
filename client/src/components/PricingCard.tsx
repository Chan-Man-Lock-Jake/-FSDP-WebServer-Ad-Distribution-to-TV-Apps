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
      <button className="btn btn-outline-dark w-100 my-3">Sign Up</button>
      <ul className="benefits-list">
        {benefits.map((benefit, index) => (
          <li key={index}>✔ {benefit}</li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
