import React from 'react';

const AdCampaignDropdown: React.FC = () => {
  return (
    <div className="dropdown-section">
      <button className="dropdown-button">Ad Campaign</button>
      <div className="dropdown-content">
        <a href="#">View Ad Campaign</a>
        <a href="#">Add Ad Campaign</a>
        <a href="#">Edit Ad Campaign</a>
        <a href="#">Delete Ad Campaign</a>
      </div>
    </div>
  );
};

export default AdCampaignDropdown;
