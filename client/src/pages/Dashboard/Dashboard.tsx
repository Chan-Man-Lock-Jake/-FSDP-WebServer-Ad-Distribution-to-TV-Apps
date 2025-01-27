import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import dogeAvatar from "../../assets/xiaohongshu doge.jpg";

interface UserActivity {
  id: number;
  userName: string;
  action: string;
  role: string;
  date: string;
}

interface ActiveCampaign {
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [userActivity, setUserActivity] = useState<UserActivity[] | null>(null);
  const [activeCampaigns, setActiveCampaigns] = useState<ActiveCampaign[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const today = new Date();
  const days = getDaysInMonth(today.getFullYear(), today.getMonth());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSunday = (date: Date) => date.getDay() === 0;

  useEffect(() => {
    axios
      .get("/api/user-activity")
      .then((response) => setUserActivity(response.data))
      .catch(() => setUserActivity([]));
  }, []);

  useEffect(() => {
    axios
      .get("/api/active-campaigns")
      .then((response) => setActiveCampaigns(response.data))
      .catch(() => setActiveCampaigns([]));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-text">
          <h1>Hello, Suzy!</h1>
          <p>Start an adventurous campaign with fascinating designs.</p>
        </div>
        <div className="header-avatar">
        <Link to="/Account-Details"> {/* Replace /profile with your desired route */}
          <img src={dogeAvatar} alt="Suzy Avatar" />
        </Link>
      </div>
      </div>

      <div className="dashboard-content">
        <div className="user-activity">
          <h2>User Activity</h2>
          <ul>
            {userActivity === null ? (
              <p>Loading...</p>
            ) : userActivity.length === 0 ? (
              <p>No entries</p>
            ) : (
              userActivity.map((activity) => (
                <li key={activity.id}>
                  <span className="user-name">{activity.userName}</span> {activity.action}
                  <span
                    className={`role ${activity.role.toLowerCase().replace(" ", "-")}`}
                  >
                    {activity.role}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="right-section">
          <div className="calendar">
            <h2>Calendar</h2>
            <div className="calendar-grid">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="calendar-header">
                  {day}
                </div>
              ))}
              {days.map((date, index) => (
                <div
                  key={index}
                  className={`calendar-day ${
                    selectedDate?.getTime() === date.getTime() ? "selected" : ""
                  } ${isToday(date) ? "highlight" : ""} ${isSunday(date) ? "sunday" : ""}`}
                  onClick={() => handleDateClick(date)}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
            {selectedDate && (
              <p className="selected-date">
                Selected Date: {selectedDate.toDateString()}
              </p>
            )}
          </div>

          <div className="active-campaigns">
            <h2>Active Campaigns</h2>
            <ul>
              {activeCampaigns === null ? (
                <p>Loading...</p>
              ) : activeCampaigns.length === 0 ? (
                <p>No entries</p>
              ) : (
                activeCampaigns.map((campaign) => (
                  <li key={campaign.id}>
                    {campaign.name} <span className="inactive-link">View more</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
