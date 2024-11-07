import React from 'react';
import Header from './components/Header';
import ActivityLog from './components/ActivityLog';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/MonitorUserActivityPage.css';

const MonitorUserActivityPage: React.FC = () => {
  return (
    <div className="monitor-user-activity-page">
      <Header />
      <div className="content">
        <ActivityLog activities={[]} />
      </div>
    </div>
  );
};

export default MonitorUserActivityPage;
