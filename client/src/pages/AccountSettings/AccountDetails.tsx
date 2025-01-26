import React, { useState } from "react";
import "./AccountDetails.css";
import { useNavigate } from "react-router-dom";

const AccountDetails: React.FC = () => {
  const [email, setEmail] = useState("Email@gmail.com");
  const [name, setName] = useState("Name goes here");
  const [userRole, setUserRole] = useState("Role");
  const navigate = useNavigate();

  const handleReset = () => {
    console.log("Reset Email and Password clicked");
  };

  return (
    <div className="account-details-page">
      <div className="back-link" onClick={() => navigate("/dashboard")}>
        ← Back
      </div>
      <h1 className="account-details-header">Account Details</h1>
      <div className="account-details-container">
        <div className="form-group">
          <label>Role</label>
          <input type="text" value={userRole} readOnly className="input-field" />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="reset-button" onClick={handleReset}>
          Reset Email and Password
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
