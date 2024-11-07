import React from 'react';
import '../css/UserSection.css';

const UserSection: React.FC = () => {
  return (
    <div className="user-section">
      <h3>User</h3>
      <div className="user-placeholder">
        <p>Sample user data will be displayed here.</p>
      </div>
    </div>
  );
};

export default UserSection;
