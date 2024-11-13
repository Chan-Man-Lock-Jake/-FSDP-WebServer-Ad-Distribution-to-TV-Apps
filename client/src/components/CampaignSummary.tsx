// client/src/pages/CampaignSummary.tsx
import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import '../css/CampaignSummary.css';

const CampaignSummary: React.FC = () => {
  const { campaignData } = useCampaign();
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = async () => {
    try {
      // Here you would make an API call to save the campaign data
      setSaveStatus('Campaign saved successfully!');
    } catch (error) {
      setSaveStatus('Error saving campaign. Please try again.');
    }
  };

  return (
    <div className="campaign-summary-container">
      <h1 className="campaign-title">Ad Campaign Summary</h1>

      <div className="campaign-summary-content">
        {/* Advertisement Section */}
        <div className="summary-box advertisement">
          <h4>Advertisement</h4>
          <p>{campaignData.advertisement || 'No Advertisement Selected'}</p>
        </div>

        {/* Summary of Selections */}
        <div className="summary-box audience">
          <h4>Target Audience</h4>
          {campaignData.audience.length > 0 ? (
            <ul>
              {campaignData.audience.map((aud, index) => (
                <li key={index}>{aud}</li>
              ))}
            </ul>
          ) : (
            <p>No Audience Selected</p>
          )}
        </div>

        {/* Metrics Section */}
        <div className="summary-box metrics">
          <h4>Performance Metrics</h4>
          {campaignData.metrics.length > 0 ? (
            <ul>
              {campaignData.metrics.map((metric, index) => (
                <li key={index}>{metric}</li>
              ))}
            </ul>
          ) : (
            <p>No Metrics Selected</p>
          )}
        </div>

        {/* Date Range Section */}
        <div className="summary-box date-range">
          <h4>Campaign Timeline</h4>
          <p>
            {new Date(campaignData.startDate).toLocaleString()} - {new Date(campaignData.endDate).toLocaleString()}
          </p>
        </div>

        {/* Campaign Title & Objective Section */}
        <div className="summary-box title-objective">
          <h4>Title</h4>
          <p>{campaignData.campaignName}</p>
          <h4>Objective</h4>
          <p>{campaignData.campaignObjective}</p>
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      {saveStatus && <p className="save-status">{saveStatus}</p>}
    </div>
  );
};

export default CampaignSummary;
