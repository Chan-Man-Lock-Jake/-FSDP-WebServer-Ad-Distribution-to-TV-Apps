import React from 'react';
import '../css/ActivityLogTable.css';

const ActivityLogTable: React.FC = () => {
  return (
    <div className="activity-log-section">
      <h2 className="activity-log-title">Activity Log</h2>
      <table className="activity-log-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Felicia</td>
            <td>Content Creator</td>
            <td>12/02/2024</td>
            <td>Created new advertisement</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogTable;
