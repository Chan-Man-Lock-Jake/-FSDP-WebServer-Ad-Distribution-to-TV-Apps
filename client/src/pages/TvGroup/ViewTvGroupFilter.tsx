import React from "react";
import "./ViewTvGroup.css";

const ViewTvGroupFilter: React.FC = () => {
    return (
    <div className="view-tv-grp-filter">
        <div className="location-filter">
            <p id="filter-cat">By Location:</p>
            <button>North</button>
            <button>South</button>
            <button>East</button>
            <button>West</button>
        </div>
        
        <div className="status-filter">
            <div className="status-btns">
                <button>Online</button>
                <button>Offline</button>
                <button>Removed</button>
            </div>
        </div>
    </div>
    )
};

export default ViewTvGroupFilter;