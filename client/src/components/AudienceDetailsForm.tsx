import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AudienceDetailsForm.css';
import { useCampaign } from '../context/CampaignContext';

const AudienceDetailsForm: React.FC = () => {
  const { campaignData, setCampaignData } = useCampaign();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  return (
    <div className="audience-details-form">
      <h1>Ad Campaign</h1>
      <div className="audience-details">
        {campaignData.audience.includes('Age') && (
          <div className="form-group">
            <label>Age Range</label>
            <input
              type="text"
              name="age"
              placeholder="Enter age range (e.g., 18-25)"
              value={campaignData.age || ''}
              onChange={handleChange}
              pattern="^\d{1,2}-\d{1,2}$" // Ensures age input is a valid range, e.g., "18-25"
            />
          </div>
        )}
        {campaignData.audience.includes('Gender') && (
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={campaignData.gender || ''}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
        {campaignData.audience.includes('Occupation') && (
          <div className="form-group">
            <label>Occupation</label>
            <input
              type="text"
              name="occupation"
              placeholder="Enter occupation"
              value={campaignData.occupation || ''}
              onChange={handleChange}
            />
          </div>
        )}
        {/* Add other fields similarly */}
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
