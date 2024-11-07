import React from 'react';
import UserDropdown from './components/UserDropdown';
import TVGroupDropdown from './components/TVGroupDropdown';
import AdCampaignDropdown from './components/AdCampaignDropdown';
import ActivityLogTable from './components/ActivityLogTable';
import './css/MonitorUserActivity.css';

const MonitorUserActivity: React.FC = () => {
  return (
    <div className="monitor-user-activity-page">
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
        <div className="filter-section">
          <div className="filter-input-container">
            <label>Filter by Name</label>
            <input type="text" placeholder="First Name" className="filter-input" />
          </div>

          <div className="filter-input-container">
            <label>Filter by Role</label>
            <input type="text" placeholder="Last Name" className="filter-input" />
          </div>

          <div className="filter-input-container">
            <label>Filter by Date</label>
            <input type="date" placeholder="Date" className="filter-input" />
          </div>

          <div className="filter-input-container">
            <label>Filter by Activity</label>
            <input type="text" placeholder="Activity" className="filter-input" />
          </div>

          <div className="filter-button-container">
            <button className="filter-apply-button">Apply Filter</button>
            <button className="filter-clear-button">Clear Filter</button>
          </div>
        </div>

        <ActivityLogTable />
      </main>
    </div>
  );
};

export default MonitorUserActivity;
