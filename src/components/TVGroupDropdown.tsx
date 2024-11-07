import React from 'react';

const TVGroupDropdown: React.FC = () => {
  return (
    <div className="dropdown-section">
      <button className="dropdown-button">TV Group</button>
      <div className="dropdown-content">
        <a href="#">View TV Group</a>
        <a href="#">Add TV Group</a>
        <a href="#">Edit TV Group</a>
        <a href="#">Delete TV Group</a>
      </div>
    </div>
  );
};

export default TVGroupDropdown;
