import React, { useEffect, useState } from "react";
import "./AccountDetails.css";
import { useNavigate } from "react-router-dom";

const AccountDetails: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setName(user.Name || "Name goes here");
    setEmail(user.Email || "Email@gmail.com");
    setUserRole(user.Role || "Role");
  }, []);

  const handleReset = () => {
    console.log("Reset Email and Password clicked");
    // Implement reset functionality here if needed
  };

  return (
    <div className="account-details-page">
      <div className="back-link" onClick={() => navigate("/admin/dashboard")}>
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
            readOnly
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            readOnly
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
