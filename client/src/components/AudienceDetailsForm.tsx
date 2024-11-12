import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AudienceDetailsForm.css';

const AudienceDetailsForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="audience-details-form">
      <h1>Ad Campaign</h1>
      <div className="audience-details">
        <div className="form-group">
          <label>Age</label>
          <input type="text" placeholder="Age" />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" placeholder="Location" />
        </div>
        {/* Add more fields as needed */}
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/campaign-details')} className="previous-button">
          Previous
        </button>
        <button onClick={() => navigate('/ad-metric-selection')} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default AudienceDetailsForm;
