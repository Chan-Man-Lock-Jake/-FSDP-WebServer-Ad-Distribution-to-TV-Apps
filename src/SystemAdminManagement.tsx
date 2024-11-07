import React from 'react';
import UserDropdown from './components/UserDropdown';
import TVGroupDropdown from './components/TVGroupDropdown';
import AdCampaignDropdown from './components/AdCampaignDropdown';
import RecentActivityLog from './components/RecentActivityLog';
import './css/SystemAdminManagement.css'; // Assuming CSS file

const SystemAdminManagement: React.FC = () => {
  return (
    <div className="system-admin-page">
      <nav className="navbar">
        <img src="path/to/logo" alt="Logo" className="navbar-logo" />
        <div className="navbar-links">
          <UserDropdown />
          <TVGroupDropdown />
          <AdCampaignDropdown />
        </div>
        <button className="logout-button">Log Out</button>
      </nav>
      
      <main className="main-content">
        <RecentActivityLog />
        <div className="management-sections">
          <UserDropdown />
          <TVGroupDropdown />
          <AdCampaignDropdown />
        </div>
        <AdCampaignDropdown />
      </main>
    </div>
  );
};

export default SystemAdminManagement;
