import React, { useState } from "react";
import "./AdvertisementHeader.css";

type AdvertisementButtonProps = {
  onStateChange: (state: "Pushed" | "Not Pushed" | "Scheduled") => void;
};

const AdvertisementButton: React.FC<AdvertisementButtonProps> = ({
  onStateChange,
}) => {
  const [selectedTab, setSelectedTab] = useState("Finalized");
  const [state, setState] = useState<"Pushed" | "Not Pushed" | "Scheduled">(
    "Not Pushed"
  );

  const handleStateChange = (
    newState: "Pushed" | "Not Pushed" | "Scheduled"
  ) => {
    setState(newState);
    onStateChange(newState);
  };

  return (
    <div className="header-controls">
      <div className="tabs">
        <button
          className={selectedTab === "Finalized" ? "tab active-tab" : "tab"}
          onClick={() => setSelectedTab("Finalized")}
        >
          Finalized
        </button>
        <button
          className={selectedTab === "Draft" ? "tab active-tab" : "tab"}
          onClick={() => setSelectedTab("Draft")}
        >
          Draft
        </button>
      </div>
      <select
        className="state-dropdown"
        value={state}
        onChange={(e) =>
          handleStateChange(
            e.target.value as "Pushed" | "Not Pushed" | "Scheduled"
          )
        }
      >
        <option value="Not Pushed">Not Pushed</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Pushed">Pushed</option>
      </select>
    </div>
  );
};

export default AdvertisementButton;
