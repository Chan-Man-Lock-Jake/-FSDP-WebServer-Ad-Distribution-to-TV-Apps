import React, { useState } from "react";
import "./ViewAdCampaignPopup.css";

type PopupProps = {
  title: string; // Campaign name
  image: string;
  objective: string;
  tv_group: string;
  demographic: string; // New field for demographic
  created_on: string;
  created_by: string;
  status: string;
  closePopup: () => void;
  onUpdate: (updatedData: any) => void; // Handler for updating the campaign
};

const PopupCard: React.FC<PopupProps> = ({
  title,
  image,
  objective,
  tv_group,
  demographic,
  created_on,
  created_by,
  status,
  closePopup,
  onUpdate,
}) => {
  // State variables for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(title);
  const [editedObjective, setEditedObjective] = useState(objective);
  const [editedTvGroup, setEditedTvGroup] = useState(tv_group);
  const [editedDemographic, setEditedDemographic] = useState(demographic);

  const handleSave = () => {
    // Construct the data to be updated. You can add more fields if needed.
    const updatedData = {
      Name: editedName,
      Objective: editedObjective,
      TvGroup: editedTvGroup,
      Demographic: editedDemographic,
    };

    onUpdate(updatedData);
    setIsEditing(false);
  };

  // Helper function: Check if the file is a video based on its extension.
  const isVideoFile = (fileUrl: string): boolean => {
    try {
      const extension = new URL(fileUrl).pathname
        .split(".")
        .pop()
        ?.toLowerCase();
      const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
      return videoExtensions.includes(extension || "");
    } catch (error) {
      console.error("Error parsing URL:", error);
      return false;
    }
  };

  const video = isVideoFile(image);

  return (
    <div className="campaign-popup" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h1>{isEditing ? "Edit Campaign" : title}</h1>
        <div className="image">
          {video ? (
            <video
              autoPlay
              loop
              controls
              muted
              playsInline
              onError={(e) => {
                console.error("Video load error:", e, "Source:", image);
              }}
            >
              <source src={image} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={image}
              alt={title}
              onError={(e) => console.error("Image error:", e)}
            />
          )}
        </div>
        {isEditing ? (
          <div className="edit-form">
            <div>
              <label>Name</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div>
              <label>Objective</label>
              <input
                type="text"
                value={editedObjective}
                onChange={(e) => setEditedObjective(e.target.value)}
              />
            </div>
            <div>
              <label>TV Group</label>
              <input
                type="text"
                value={editedTvGroup}
                onChange={(e) => setEditedTvGroup(e.target.value)}
              />
            </div>
            <div>
              <label>Demographic</label>
              <input
                type="text"
                value={editedDemographic}
                onChange={(e) => setEditedDemographic(e.target.value)}
              />
            </div>
            <div className="form-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="details">
            <div>
              <h1>Name</h1>
              <p>{title}</p>
            </div>
            <div>
              <h1>Objective</h1>
              <p>{objective}</p>
            </div>
            <div>
              <h1>TV Group Assigned</h1>
              <p>{tv_group}</p>
            </div>
            <div>
              <h1>Demographic</h1>
              <p>{demographic}</p>
            </div>
            <div>
              <h1>Created On</h1>
              <p>{created_on}</p>
            </div>
            <div>
              <h1>Created By</h1>
              <p>{created_by}</p>
            </div>
            <div>
              <h1>Status</h1>
              <p>{status}</p>
            </div>
            {/* Edit button */}
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupCard;
