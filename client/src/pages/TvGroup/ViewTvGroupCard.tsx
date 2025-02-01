import React from "react";
import "./ViewTvGroup.css";

type ViewTvGroupCardProp = {
  TvGroupId: string;
  TvGroupName: string;
  TotalTv: string;
  Location: string;
  TvGroupDesc: string;
  TvGroupStatus: string;
  Region: string;
  onClick: () => void;
};

const ViewTvGroupCard: React.FC<ViewTvGroupCardProp> = ({
  TvGroupId,
  TvGroupName,
  TotalTv,
  Location,
  TvGroupDesc,
  TvGroupStatus,
  Region,
  onClick,
}) => {
  return (
    <div className="tv-grp-card">
        <h4>{TvGroupName}</h4>
        <p>{TotalTv} TV</p>
        <p>{Location}</p>
        <p>{TvGroupDesc}</p>
      <div
        className={`status-indicator ${
          TvGroupStatus === "Online"
            ? "online"
            : TvGroupStatus === "Offline"
            ? "offline"
            : "removed"
        }`}
      >
        <span
          className={`status-dot ${
            TvGroupStatus === "Online"
              ? "status-green"
              : TvGroupStatus === "Offline"
              ? "status-red"
              : "status-gray"
          }`}
        ></span>
        {TvGroupStatus}
      </div>
      <button className="view-tv-grp-button" onClick={onClick}>
        View
      </button>
    </div>
  );
};

export default ViewTvGroupCard;
