import React from "react";
//import { useState } from "react";
import "./CreateTvGroup.css";
//<img src="../../../src/assets/icon1.jpg" alt="select tv icon" className="icon" />
//<img src="../../../src/assets/icon2.jpg" alt="select tv icon" className="icon" />
//<img src="../../../src/assets/icon3.jpg" alt="select tv icon" className="icon" />
//<img src="../../../src/assets/icon4.jpg" alt="select tv icon" className="icon" />




const CreateTvGroup: React.FC = () => {
    //const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    return (
        <div className="create-tv-group-header">
            <ul className="create-tv-group-header-text">
                <li className="active"><img src="../../../src/assets/highlightedicon1.jpg" alt="select tv icon" className="icon" />Select TV</li>
                <li><img src="../../../src/assets/icon2.jpg" alt="select tv icon" className="icon" />New Group</li>
                <li><img src="../../../src/assets/icon3.jpg" alt="select tv icon" className="icon" />Review Group Details</li>
                <li><img src="../../../src/assets/icon4.jpg" alt="select tv icon" className="icon" />Confirmation</li>
                <div className="icons">
                    <li><img src="../../../src/assets/notification.jpg" alt="notification icon" className="icon" /></li>
                    <li><img src="../../../src/assets/profilepicture.jpg" alt="profile picture icon" className="icon" /></li>
                </div>
            </ul>
        </div>
    )

};

export default CreateTvGroup;




