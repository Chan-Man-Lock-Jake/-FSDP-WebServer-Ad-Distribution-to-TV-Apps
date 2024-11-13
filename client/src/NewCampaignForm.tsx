// client/src/pages/NewCampaignForm.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from './context/CampaignContext';
import './css/NewCampaignForm.css';

const NewCampaignForm: React.FC = () => {
  const { campaignData, setCampaignData } = useCampaign();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCampaignData({ ...campaignData, campaignName: value });
  };

  const handleNext = () => {
    navigate('/next-campaign-form');
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
          value={campaignData.campaignName}
          onChange={handleChange}
        />
      </form>
      <div className="button-group">
        <button className="next-button" onClick={() => navigate('/')}>
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
