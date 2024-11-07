// src/pages/AdCampaignManagement.tsx
import React from 'react';
import AdCampaignCard from './components/AdCampaignCard';
import AdCampaignTable from './components/AdCampaignTable';
import AdCampaignControls from './components/AdCampaignControls';
import CalendarSection from './components/CalendarSection';

const AdCampaignManagement: React.FC = () => {
  return (
    <div className="ad-campaign-management-page">
      <nav className="navbar">
        <img src="path/to/logo" alt="Logo" className="navbar-logo" />
        <div className="navbar-links">
          <button className="campaign-dropdown-button">Ad Campaign ▼</button>
          <button className="create-campaign-button">Create Campaign</button>
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
