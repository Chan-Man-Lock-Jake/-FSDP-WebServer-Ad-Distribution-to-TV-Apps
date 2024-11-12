import React from 'react';
import { Link } from 'react-router-dom';
import './css/ExistingCampaigns.css'; // Assuming you have the appropriate CSS

const ExistingCampaigns: React.FC = () => {
  return (
    <div className="existing-campaigns-container">
      <h1 className="page-title">Existing campaigns</h1>
      <Link to="/edit-campaigns" className="edit-campaigns-link">
        Edit campaigns
      </Link>
      <div className="campaign-box">
        <h3>Ad Campaign No 1</h3>
        <p>Created by:</p>
        <div className="campaign-description">
          {/* Placeholder text. You can replace this with actual data */}
        </div>
      </div>
      <div className="next-button-container">
        <button className="next-button">Next</button>
      </div>
    </div>
  );
};

export default ExistingCampaigns;
