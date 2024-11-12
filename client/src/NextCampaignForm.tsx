import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/NextCampaignForm.css';

const NextCampaignForm: React.FC = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate('/new-campaign-form'); // Navigate to the new campaign form page
  };

  const handleNext = () => {
    navigate('/campaign-details'); // Placeholder for the next page
  };

  return (
    <div className="next-campaign-form-container">
      <h1 className="campaign-title">Ad Campaign</h1>
      <p className="campaign-description">What is your objective of this campaign?</p>
      <form className="form-container">
        <textarea
          className="form-textarea"
          placeholder="Brand awareness/Increase sale profits/To persuade/To inform"
          rows={6}
        />
      </form>
      <div className="button-group">
        <button className="previous-button" onClick={handlePrevious}>
          Previous
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NextCampaignForm;
