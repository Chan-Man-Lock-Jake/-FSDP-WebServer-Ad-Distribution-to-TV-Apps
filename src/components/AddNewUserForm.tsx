import React from 'react';
import '../css/AddNewUserForm.css';

const AddNewUserForm: React.FC = () => {
  return (
    <div className="add-user-form-container">
      <h2 className="form-title">Add New User</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />
        </div>

        <div className="form-group">
          <label>Date Of Birth</label>
          <input type="date" placeholder="Date Of Birth" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Email" />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input type="text" placeholder="Role" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Phone Number" />
        </div>
      </div>
    </div>
  );
};

export default AddNewUserForm;
