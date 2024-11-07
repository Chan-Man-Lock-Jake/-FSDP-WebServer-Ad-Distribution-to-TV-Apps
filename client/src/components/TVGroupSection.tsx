import React from 'react';
import '../css/TVGroupSection.css';

const TVGroupSection: React.FC = () => {
  return (
    <div className="tv-group-section">
      <h3>Active TV Group</h3>
      <ul>
        <li>MacD</li>
        <li>BratDrinks</li>
        <li>OatWay</li>
      </ul>
    </div>
  );
};

export default TVGroupSection;
