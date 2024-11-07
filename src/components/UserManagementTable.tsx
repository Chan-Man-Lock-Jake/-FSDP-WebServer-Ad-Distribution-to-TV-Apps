import React from 'react';
import '../css/UserManagementTable.css';
import { Link } from 'react-router-dom'; 

const UserManagementTable: React.FC = () => {
  return (
    <div className="user-management-section">
      
      <div className="filter-section">
        <div className="filter-input-container">
          <label>Filter by First Name</label>
          <input type="text" placeholder="First Name" className="filter-input" />
        </div>
        
        <div className="filter-input-container">
          <label>Filter by Last Name</label>
          <input type="text" placeholder="Last Name" className="filter-input" />
        </div>

        <div className="filter-input-container">
          <label>Filter by Email</label>
          <input type="text" placeholder="Email" className="filter-input" />
        </div>

        <div className="filter-input-container">
          <label>Filter by Phone No.</label>
          <input type="text" placeholder="Phone No." className="filter-input" />
        </div>

        <div className="filter-select-container">
          <label>Filter by Company</label>
          <select className="filter-select" defaultValue="">
            <option value="" disabled>Select Company</option>
            {/* Add company options here */}
          </select>
        </div>
        
        <div className="filter-select-container">
          <label>Filter by Role</label>
          <select className="filter-select" defaultValue="">
            <option value="" disabled>Select Role</option>
            {/* Add role options here */}
          </select>
        </div>

        <div className="filter-button-container">
          <button className="filter-apply-button">Apply Filter</button>
          <button className="filter-clear-button">Clear Filter</button>
        </div>
      </div>
      
      <Link to="/add-new-user">
          <button className="add-user-button">+ Add New User</button>
        </Link>
      
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Company</th>
            <th>Role</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Felicia</td>
            <td>Ng</td>
            <td>FeliciaNg@MacD.com</td>
            <td>88123456</td>
            <td>MacD</td>
            <td>
              Content Creator
              <button className="edit-role-button">✎</button>
            </td>
            <td>12/02/2024</td>
            <td>
              <button className="delete-user-button">🗑</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;
