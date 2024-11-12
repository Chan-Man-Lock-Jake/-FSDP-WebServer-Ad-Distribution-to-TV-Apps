// client/src/pages/CampaignTimelineForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaign } from '../context/CampaignContext';
import DatePicker from 'react-datepicker'; // Add a date picker library
import 'react-datepicker/dist/react-datepicker.css';
import '../css/CampaignDateForm.css'

const CampaignTimelineForm: React.FC = () => {
  const { campaignData, setCampaignData } = useCampaign();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setCampaignData({
      ...campaignData,
      startDate: date?.toISOString() || '',
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setCampaignData({
      ...campaignData,
      endDate: date?.toISOString() || '',
    });
  };

  const handleNext = () => {
    navigate('/campaign-summary');
  };

  return (
    <div className="campaign-timeline-form-container">
      <h1 className="campaign-title">Ad Campaign</h1>
      <p className="campaign-description">Select a timeline for your campaign</p>
      <div className="date-picker-container">
        <div className="form-group">
          <label>Start Date and Time</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select start date and time"
            className="date-picker"
          />
        </div>
        <div className="form-group">
          <label>End Date and Time</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select end date and time"
            className="date-picker"
          />
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/ad-selection-page')} className="previous-button">
          Previous
        </button>
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignTimelineForm;
