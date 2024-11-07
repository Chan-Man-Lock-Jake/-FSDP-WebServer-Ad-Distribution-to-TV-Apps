import React from 'react';
import { Link } from 'react-router-dom';
import '../css/UserDropdown.css';

const UserDropdown: React.FC = () => {
  return (
    <div className="dropdown-section">
      <button className="dropdown-button">User ▼</button>
      <div className="dropdown-content">
        <Link to="/admin-management">View Users</Link>
        <Link to="/add-new-user">Add Users</Link>
        <Link to="/monitor-user-activity">Monitor User Activity</Link>
      </div>
    </div>
  );
};

export default UserDropdown;
