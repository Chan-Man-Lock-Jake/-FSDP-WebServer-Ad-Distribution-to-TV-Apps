
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AdSelectionForm.css';

const AdSelectionForm: React.FC = () => {
  return (
    <div className="ad-selection-page">
      <div className="ad-selection-container">
        <h1 className="ad-selection-title">Ad Campaign</h1>
        <p className="ad-selection-subtitle">Select your advertisement</p>

        {/* Placeholder for future table of ads */}
        <div className="ad-placeholder">
          {/* Future implementation: Add a table of ads here */}
        </div>

        <div className="ad-navigation-buttons">
          <Link to="/campaign-metric-selection">
            <button className="ad-navigation-button">Previous</button>
          </Link>
          <Link to="/campaign-summary">
            <button className="ad-navigation-button">Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdSelectionForm;
