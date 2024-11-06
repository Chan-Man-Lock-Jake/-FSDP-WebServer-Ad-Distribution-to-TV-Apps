import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={toggleAnswer}>
        {question}
        <span className="faq-toggle-icon">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p className="faq-answer-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
