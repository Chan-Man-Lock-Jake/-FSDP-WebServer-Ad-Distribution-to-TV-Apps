import React, { useState } from 'react';
import './Faq.css'; // Custom styles for the FAQ page

const Faq: React.FC = () => {
  // State to manage the visibility of each dropdown
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Function to toggle a specific question
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="text-center faq-title">FAQs</h2>
      <div className="faq-container">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleQuestion(index)}
            >
              Question {index + 1}
              <span className="faq-toggle-icon">
                {openIndex === index ? '-' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                <p className="faq-answer-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="faq-contact text-center">
        For additional queries, please contact us at <a href="mailto:suave@gmail.com">suave@gmail.com</a>
      </p>
    </section>
  );
};

export default Faq;
