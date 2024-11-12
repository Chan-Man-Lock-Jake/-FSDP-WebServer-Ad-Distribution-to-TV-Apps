import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/NewCampaignForm.css';

const NewCampaignForm: React.FC = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate('/create-campaign'); // Navigate to the create campaign page
  };

  const handleNext = () => {
    navigate('/next-campaign-form'); // Navigate to the next form page
  };

  return (
    <div className="new-campaign-form-container">
      <h1 className="campaign-title">Ad Campaign</h1>
      <p className="campaign-description">Give your campaign a stunning title!</p>
      <form className="form-container">
        <label htmlFor="campaignTitle" className="form-label">Title</label>
        <input
          type="text"
          id="campaignTitle"
          className="form-input"
          placeholder="Enter campaign title"
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

export default NewCampaignForm;
