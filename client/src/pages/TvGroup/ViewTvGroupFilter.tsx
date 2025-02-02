import React from "react";
import { useState } from "react";
import "./ViewTvGroup.css"

type FilterCat = {
    onFilterChange: (
    filters: {
        region?: "North" | "South" | "East" | "West" | "Central";
        status?: "Online" | "Offline" | "Removed";
    }) => void;
}

const ViewTvGroupFilter: React.FC<FilterCat> = ({ onFilterChange }) => {
    const [activeRegion, setActiveRegion] = useState<"North" | "South" | "East" | "West" | "Central"| null>(null);
    const [activeStatus, setActiveStatus] = useState<"Online" | "Offline" | "Removed" | null>(null);

    const handleRegionClick = (region: "North" | "South" | "East" | "West" | "Central") => {
        const newRegion = activeRegion === region ? null: region;
        setActiveRegion(newRegion);
        onFilterChange({ region: newRegion || undefined, status: activeStatus || undefined });
    };

    const handleStatusClick = (status: "Online" | "Offline" | "Removed") => {
        const newStatus = activeStatus === status ? null: status;
        setActiveStatus(newStatus);
        onFilterChange({ region: activeRegion || undefined, status: newStatus || undefined });
    };

    const resetFilters = () => {
        setActiveRegion(null);
        setActiveStatus(null);
        onFilterChange({});
    };

    return (
        <div className="view-tv-grp-filter">
            <div className="region-filter">
                <p id="filter-cat">By Region</p>
                {["North", "South", "East", "West", "Central"].map((region) => 
                (<button 
                key={region} 
                className={activeRegion === region ? "active" : ""}
                onClick={() => handleRegionClick(region as "North" | "South" | "East" | "West" | "Central")}>
                    {region}
                </button>
            ))}
            </div>

            <div className="reset-filter">
                <button onClick={resetFilters}>Reset Filters</button>
            </div>

            <div className="status-filter">
                <div className="status-btns">
                    {["Online", "Offline", "Removed"].map((status) => (
                        <button key={status}
                        className={activeStatus === status ? "active" : ""}
                        onClick={() => handleStatusClick(status as "Online" | "Offline" | "Removed")}>
                            {status}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ViewTvGroupFilter;