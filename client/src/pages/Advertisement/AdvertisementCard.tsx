import React from "react";
import "./AdvertisementCard.css";

type AdvertisementProps = {
  title: string;
  description: string;
  status: "Pushed" | "Not Pushed" | "Scheduled";
  onView: () => void;
};

const AdvertisementCard: React.FC<AdvertisementProps> = ({
  title,
  description,
  status,
  onView,
}) => {
  return (
    <div className="advertisement-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-status">
        <div
          className={`status-indicator ${
            status === "Pushed" ? "pushed" : "not-pushed"
          }`}
        ></div>
        <span
          className={`status-text ${
            status === "Pushed" ? "pushed" : "not-pushed"
          }`}
        >
          {status}
        </span>
      </div>
      <button className="view-button" onClick={onView}>
        View
      </button>
    </div>
  );
};

export default AdvertisementCard;
