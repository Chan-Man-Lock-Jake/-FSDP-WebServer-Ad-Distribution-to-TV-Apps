import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdvertisementHeader.css";

type AdvertisementButtonProps = {
  onStateChange: (state: "Pushed" | "Not Pushed" | "Scheduled") => void;
  onTypeChange: (type: "Finalized" | "Draft") => void;
};

const AdvertisementButton: React.FC<AdvertisementButtonProps> = ({
  onStateChange,
  onTypeChange,
}) => {
  const [selectedTab, setSelectedTab] = useState<"Finalized" | "Draft">(
    "Finalized"
  );
  const [state, setState] = useState<"Pushed" | "Not Pushed" | "Scheduled">(
    "Not Pushed"
  );

  const navigate = useNavigate();

  const handleTabClick = (type: "Finalized" | "Draft") => {
    setSelectedTab(type);
    onTypeChange(type);
  };

  const handleStateChange = (
    newState: "Pushed" | "Not Pushed" | "Scheduled"
  ) => {
    setState(newState);
    onStateChange(newState);
  };

  const handlePushAdNow = () => {
    navigate("/admin/push-ad-now"); 
  };

  return (
    <div className="header-controls">
      <div className="tabs">
        <button
          className={selectedTab === "Finalized" ? "tab active-tab" : "tab"}
          onClick={() => handleTabClick("Finalized")}
        >
          Finalized
        </button>
        <button
          className={selectedTab === "Draft" ? "tab active-tab" : "tab"}
          onClick={() => handleTabClick("Draft")}
        >
          Draft
        </button>
      </div>
      {selectedTab === "Finalized" && (
        <div className="finalized-controls">
          <select
            className="state-dropdown"
            value={state}
            onChange={(e) =>
              handleStateChange(
                e.target.value as "Pushed" | "Not Pushed" | "Scheduled"
              )
            }
          >
            <option value="Not Pushed">Status: Not Pushed</option>
            <option value="Scheduled">Status: Scheduled</option>
            <option value="Pushed">Status: Pushed</option>
          </select>
          {/* <button className="tab" onClick={handlePushAdNow}>
            Push Ad Now
          </button> */}
        </div>
      )}
    </div>
  );
};

export default AdvertisementButton;
