// src/pages/AdCampaignManagement.tsx
import React from 'react';
import AdCampaignDropdown from './components/AdCampaignDropdown';
import AdCampaignCard from './components/AdCampaignCard';
import AdCampaignTable from './components/AdCampaignTable';
import AdCampaignControls from './components/AdCampaignControls';
import CalendarSection from './components/CalendarSection';
import { Link } from 'react-router-dom';

const AdCampaignManagement: React.FC = () => {
  return (
    <div className="ad-campaign-management-page">
      <nav className="navbar">
        <img src="path/to/logo" alt="Logo" className="navbar-logo" />
        <div className="navbar-links">
          {/* Replace the button with the dropdown component */}
          <AdCampaignDropdown />
          <Link className="btn btn-dark me-2" to="/create-campaign">Create Campaign</Link>
        </div>
        <button className="logout-button">Log Out</button>
      </nav>
      
      <main className="main-content">
        {/* AdCampaignCard should be placed above the AdCampaignContainer */}
        <AdCampaignCard />
      </main>
      <div className="ad-campaign-container">
          <AdCampaignTable />
          <AdCampaignControls />
        </div>
        <CalendarSection />
    </div>
  );
};

export default AdCampaignManagement;
