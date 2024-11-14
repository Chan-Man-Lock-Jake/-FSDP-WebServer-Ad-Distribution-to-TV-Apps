import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/AdCampaignMetricSelection.css';
import { useCampaign } from '../context/CampaignContext';

const AdCampaignMetricSelection: React.FC = () => {
  const { campaignData, setCampaignData } = useCampaign();
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(campaignData.metrics);

  // Update campaignData when metrics change
  useEffect(() => {
    setCampaignData((prevData) => ({ ...prevData, metrics: selectedMetrics }));
  }, [selectedMetrics, setCampaignData]);

  const handleMetricClick = (metric: string) => {
    setSelectedMetrics((prev) => {
      if (prev.includes(metric)) {
        return prev.filter((m) => m !== metric);
      } else {
        return [...prev, metric];
      }
    });
  };

  return (
    <div className="ad-campaign-metric-selection-page">
      <div className="ad-campaign-metric-selection-container">
        <h1 className="ad-campaign-metric-selection-title">Ad Campaign</h1>
        <p className="ad-campaign-metric-selection-subtitle">Measure your campaign’s performance using...</p>

        <div className="ad-campaign-metric-selection-buttons">
          <button
            className={`ad-campaign-metric-button ${selectedMetrics.includes('Polls') ? 'selected' : ''}`}
            onClick={() => handleMetricClick('Polls')}
          >
            Polls
          </button>
          <button
            className={`ad-campaign-metric-button ${selectedMetrics.includes('Interaction Rate') ? 'selected' : ''}`}
            onClick={() => handleMetricClick('Interaction Rate')}
          >
            Interaction Rate
          </button>
          {/* Add more metrics as needed */}
        </div>

        <div className="navigation-buttons">
          <Link to="/audience-details-form">
            <button className="previous-button">Previous</button>
          </Link>
          <Link to="/ad-selection-page">
            <button className="previous-button">Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdCampaignMetricSelection;
