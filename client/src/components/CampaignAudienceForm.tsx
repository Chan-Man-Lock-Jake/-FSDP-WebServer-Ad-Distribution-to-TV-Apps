import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CampaignAudienceForm.css';
import { useCampaign } from '../context/CampaignContext';

const CampaignAudienceForm: React.FC = () => {
  const { campaignData, setCampaignData } = useCampaign();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(campaignData.audience);

  const navigate = useNavigate();

  const handleSelection = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNext = () => {
    setCampaignData({
      ...campaignData,
      audience: selectedOptions,
    });
    navigate('/audience-details-form');
  };

  return (
    <div className="campaign-audience-form">
      <h1>Ad Campaign</h1>
      <p>Choose your audience based on</p>
      <div className="audience-options">
        {['Age', 'Location', 'Gender', 'Interests', 'Income Level', 'Occupation'].map((option) => (
          <button
            key={option}
            className={`audience-option ${selectedOptions.includes(option) ? 'selected' : ''}`}
            onClick={() => handleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/create-campaign')} className="previous-button">
          Previous
        </button>
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignAudienceForm;
