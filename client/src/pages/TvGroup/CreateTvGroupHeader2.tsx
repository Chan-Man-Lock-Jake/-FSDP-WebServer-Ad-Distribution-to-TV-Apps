import React from "react";
import "./CreateTvGroup.css";

const CreateTvGroupHeader2: React.FC = () => {
    return (
        <div className="create-tv-group-header">
            <ul className="create-tv-group-header-text">
                <li><img src="../../../src/assets/icon1.jpg" alt="select tv icon" className="icon" />Select TV</li>
                <li className="active"><img src="../../../src/assets/highlightedicon2.jpg" alt="new group icon" className="icon" />New Group</li>
                <li><img src="../../../src/assets/icon3.jpg" alt="review group details icon" className="icon" />Review Group Details</li>
                <li><img src="../../../src/assets/icon4.jpg" alt="confirmation icon" className="icon" />Confirmation</li>
                <div className="icons">
                    <li><img src="../../../src/assets/notification.jpg" alt="notification icon" className="icon" /></li>
                    <li><img src="../../../src/assets/profilepicture.jpg" alt="profile picture icon" className="icon" /></li>
                </div>
            </ul>
        </div>
    )

};

export default CreateTvGroupHeader2;
