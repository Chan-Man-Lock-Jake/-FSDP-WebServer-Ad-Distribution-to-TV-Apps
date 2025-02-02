import React from "react";
import "./ViewAdCampaignPopup.css";

type PopupProps = {
  image: string;
  objective: string;
  tv_group: string;
  created_on: string;
  created_by: string;
  status: string;
  closePopup: () => void;
};

const PopupCard: React.FC<PopupProps> = ({
  image,
  objective,
  tv_group,
  created_on,
  created_by,
  status,
  closePopup,
}) => {
  return (
    <div className="campaign-popup" onClick={closePopup}>
      <div className="popup-content">
        <h1>Christmas Specials Chicken Burger</h1>
        <div className="image"><img src={image || "No Image"}/></div>
        <div>
            <div>
                <h1>Objective</h1><p>{objective}</p>
            </div>
            <div>
                <h1>TV Group Assigned</h1><p>{tv_group}</p>
            </div>
            <div>
                <h1>Created On</h1><p>{created_on}</p>
            </div>
            <div>
                <h1>Created By</h1><p>{created_by}</p>
            </div>
            <div>
                <h1>Status</h1><p>{status}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
