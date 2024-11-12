// client/src/pages/NextCampaignForm.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from './context/CampaignContext';
import './css/NextCampaignForm.css';

const NextCampaignForm: React.FC = () => {
  const { campaignData, setCampaignData } = useCampaign();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCampaignData({ ...campaignData, campaignObjective: value });
  };

  const handleNext = () => {
    navigate('/campaign-details');
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
          value={campaignData.campaignObjective}
          onChange={handleChange}
        />
      </form>
      <div className="button-group">
        <button className="next-button" onClick={() => navigate('/new-campaign-form')}>
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
