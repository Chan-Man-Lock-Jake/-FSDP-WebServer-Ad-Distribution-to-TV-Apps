import React from "react";
import { useNavigate } from "react-router-dom";

type AdCampaignCardProps = {
  title: string;
  description: string;
  status?: "Pushed" | "Not Pushed" | "Scheduled"; // Optional for Drafts
  type: "Finalized" | "Draft";
  onView: () => void;
};

const AdCampaignCard: React.FC<AdCampaignCardProps> = ({
  title,
  description,
  status,
  type,
  onView,
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    // Navigate to CreateAdvertisement page
    navigate("/create-advertisement");
  };

  return (
    <li>
        <div><img src={}/></div>
        <h2>Christmas Specials Chicken Burger</h2>
        <h3>Created on:</h3>
        <h3>Created by:</h3>
    </li>
    // <div className="advertisement-card">
    //   <h3 className="card-title">{title}</h3>
    //   <p className="card-description">{description}</p>
    //   {type === "Finalized" && status && (
    //     <div className="card-status">
    //       <span
    //         className={`status-indicator ${status.replace(/\s+/g, "-").toLowerCase()}`}
    //       />
    //       <span
    //         className={`status-text ${status.replace(/\s+/g, "-").toLowerCase()}`}
    //       >
    //         {status}
    //       </span>
    //     </div>
    //   )}

    //   <button className="view-button" onClick={handleViewClick}>
    //     View
    //   </button>
    // </div>
  );
};

export default AdCampaignCard;
