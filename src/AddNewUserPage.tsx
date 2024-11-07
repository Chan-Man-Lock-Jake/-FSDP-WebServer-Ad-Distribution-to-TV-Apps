import React from 'react';
import AddNewUserForm from './components/AddNewUserForm';
import UserDropdown from './components/UserDropdown';
import TVGroupDropdown from './components/TVGroupDropdown';
import AdCampaignDropdown from './components/AdCampaignDropdown';
import BlankSpace from './components/BlankSpace';

const AddNewUserPage: React.FC = () => {
  return (
    <div className="add-user-page">
      <BlankSpace />
      <UserDropdown />
      <TVGroupDropdown />
      <AdCampaignDropdown />
      <AddNewUserForm />
      <div className="add-user-button-container">
        {/* Add User Button Below the Form Fields */}
        <button className="add-user-button">Add User</button>
      </div>
    </div>
  );
};

export default AddNewUserPage;
