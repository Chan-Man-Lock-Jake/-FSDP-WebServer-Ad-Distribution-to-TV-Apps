import React from 'react';
import UserDropdown from './components/UserDropdown';
import TVGroupDropdown from './components/TVGroupDropdown';
import AdCampaignDropdown from './components/AdCampaignDropdown';
import RecentActivityLog from './components/RecentActivityLog';
import UserManagementTable from './components/UserManagementTable';
import './css/Sam.css'; // Double-check if the case matches exactly

const SystemAdminManagement: React.FC = () => {
  return (
    <div className="system-admin-page">
      <nav className="navbar">
        {/* Update the logo path correctly */}
        <div className="navbar-links">
          <UserDropdown />
          <TVGroupDropdown />
          <AdCampaignDropdown />
        </div>
        <button className="logout-button">Log Out</button>
      </nav>
      
      <main className="main-content">
        <RecentActivityLog />
        <UserManagementTable />
      </main>
    </div>
  );
};

export default SystemAdminManagement;

