import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdvertisementCard.css";

type AdvertisementCardProps = {
  title: string;
  description: string;
  status?: "Pushed" | "Not Pushed" | "Scheduled"; // Optional for Drafts
  type: "Finalized" | "Draft";
  onView: () => void;
};

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  title,
  description,
  status,
  type,
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    // Navigate to CreateAdvertisement page
    navigate("/create-advertisement");
  };

  return (
    <div className="advertisement-card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      {type === "Finalized" && status && (
        <div className="card-status">
          <span
            className={`status-indicator ${status.replace(/\s+/g, "-").toLowerCase()}`}
          />
          <span
            className={`status-text ${status.replace(/\s+/g, "-").toLowerCase()}`}
          >
            {status}
          </span>
        </div>
      )}

      <button className="view-button" onClick={handleViewClick}>
        View
      </button>
    </div>
  );
};

export default AdvertisementCard;
