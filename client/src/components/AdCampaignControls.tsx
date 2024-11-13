// src/components/AdCampaignControls.tsx
import React from 'react';
import '../css/AdCampaignControls.css';
import { Link } from 'react-router-dom';


const AdCampaignControls: React.FC = () => {
  return (
    <div className="ad-campaign-controls">
      <Link to="/create-campaign">
        <button className="create-campaign-button">Create Ad Campaign ➕</button>
      </Link>
      <button className="edit-campaign-button">Edit Ad Campaign ✎</button>
      <button className="delete-campaign-button">Delete Ad Campaign 🗑</button>
    </div>
  );
};

export default AdCampaignControls;
