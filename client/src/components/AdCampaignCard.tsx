
import React from 'react';
import '../css/AdCampaignCard.css';

const AdCampaignCard: React.FC = () => {
  return (
    <div className="ad-campaign-card">
      <div className="ad-campaign-content">
        <p>Ad Campaign</p>
      </div>
      <div className="ad-campaign-actions">
        <button className="edit-campaign-button">✎</button>
        <button className="delete-campaign-button">🗑</button>
      </div>
    </div>
  );
};

export default AdCampaignCard;
