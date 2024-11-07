import React from 'react';

const UserDropdown: React.FC = () => {
  return (
    <div className="dropdown-section">
      <button className="dropdown-button">User</button>
      <div className="dropdown-content">
        <a href="#">View Users</a>
        <a href="#">Add Users</a>
        <a href="#">Monitor User Activity</a>
      </div>
    </div>
  );
};

export default UserDropdown;
