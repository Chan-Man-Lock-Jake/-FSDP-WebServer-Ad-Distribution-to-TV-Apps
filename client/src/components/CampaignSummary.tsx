import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/CampaignSummary.css';

const CampaignSummary: React.FC = () => {
  // States to store campaign details
  const [advertisement, setAdvertisement] = useState('');
  const [ageGroup, setAgeGroup] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  const [title, setTitle] = useState('');
  const [tvGroups, setTvGroups] = useState<string[]>([]);

  const navigate = useNavigate();

  // Mocking fetch data from previous inputs
  useEffect(() => {
    // Here you can fetch data from a global state (like Redux), context API, or any temporary storage.
    setAdvertisement('Sample Advertisement');
    setAgeGroup('20-28');
    setLocation('Northeast');
    setMetrics(['Polling']);
    setDateRange({ start: '10/03/2024', end: '10/17/2024' });
    setTitle('Lorem Ipsum Ad Campaign');
    setTvGroups(['TV Group A', 'TV Group B']);
  }, []);

  // Handle Save functionality
  const handleSave = () => {
    // Save campaign details logic here (could be an API call)
    alert('Campaign saved successfully!');
  };

  return (
    <div className="campaign-summary-page">
      <h2 className="text-center">Ad Campaign</h2>

      {/* Advertisement Section */}
      <div className="summary-section advertisement">
        <div className="summary-box advertisement-box">
          {advertisement ? <p>Advertisement</p> : <p>No Advertisement Selected</p>}
        </div>
      </div>

      {/* Summary of Selections */}
      <div className="summary-section details">
        <button className="summary-detail-button">{ageGroup}</button>
        <button className="summary-detail-button">{location}</button>
        {metrics.map((metric, index) => (
          <button key={index} className="summary-detail-button">
            {metric}
          </button>
        ))}
      </div>

      {/* Date and Campaign Title */}
      <div className="summary-section date-and-title">
        <div className="calendar-section">
          <div className="calendar-box">{`${dateRange.start} - ${dateRange.end}`}</div>
        </div>
        <div className="title-section">
          <div className="title-box">
            <h4>Title</h4>
            <p>{title}</p>
          </div>
        </div>
      </div>

      {/* TV Groups Section */}
      <div className="summary-section tv-groups">
        <div className="summary-box tv-groups-box">
          <p>TV Groups</p>
          {tvGroups.length > 0 ? (
            <ul>
              {tvGroups.map((group, index) => (
                <li key={index}>{group}</li>
              ))}
            </ul>
          ) : (
            <p>No TV Groups Selected</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="save-button-container">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CampaignSummary;
