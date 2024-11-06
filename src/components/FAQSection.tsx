import React from 'react';
import FAQItem from './FAQItem';
import '../css/Faq.css';


const FAQSection: React.FC = () => {
  return (
    <section className="faq-section">
      <h2 className="text-center faq-title">FAQs</h2>
      <div className="faq-container">
        {[...Array(5)].map((_, index) => (
          <FAQItem key={index} question={`Question ${index + 1}`} />
        ))}
      </div>
      <p className="faq-contact text-center">
        For additional queries, please contact us at <a href="mailto:suave@gmail.com">suave@gmail.com</a>
      </p>
    </section>
  );
};

export default FAQSection;
