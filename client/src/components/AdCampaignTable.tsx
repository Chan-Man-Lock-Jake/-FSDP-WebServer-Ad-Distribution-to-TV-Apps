// src/components/AdCampaignTable.tsx
import React from 'react';
import '../css/AdCampaignTable.css';

const AdCampaignTable: React.FC = () => {
  return (
    <div className="ad-campaign-table">
      <table>
        <thead>
          <tr>
            <th>Ad Campaign</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name1</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Name2</td>
            <td>Scheduled</td>
          </tr>
          <tr>
            <td>Name3</td>
            <td>Ended</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdCampaignTable;
