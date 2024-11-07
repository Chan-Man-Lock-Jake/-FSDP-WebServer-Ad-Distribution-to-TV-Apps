import React from 'react';
import '../css/AdCampaignDropdown.css';
import { Link } from 'react-router-dom';

const AdCampaignDropdown: React.FC = () => {
  return (
    <div className="dropdown-section">
      <button className="dropdown-button">Ad Campaign ▼</button>
      <div className="dropdown-content">
        <Link to="/view-ad-campaign">View Ad Campaign</Link>
        <Link to="/edit-ad-campaign">Edit Ad Campaign</Link>
        <Link to="/delete-ad-campaign">Delete Ad Campaign</Link>
      </div>
    </div>
  );
};

export default AdCampaignDropdown;
