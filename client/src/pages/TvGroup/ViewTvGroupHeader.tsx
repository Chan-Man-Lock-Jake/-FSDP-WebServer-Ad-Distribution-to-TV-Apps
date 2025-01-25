import React from "react";
import "./ViewTvGroup.css";

const ViewTvGroupHeader: React.FC = () => {
    return (
    <div className="view-tv-group-header">
        <ul className="existing-tv-header-text">
            <li>View Existing Groups</li>
            <li className="icons">
                <img src="../../../src/assets/notification.jpg" alt="notification icon" className="icon" />
                <img src="../../../src/assets/profilepicture.jpg" alt="profile picture icon" className="icon" />
            </li>
        </ul>
    </div>
    )
};

export default ViewTvGroupHeader;