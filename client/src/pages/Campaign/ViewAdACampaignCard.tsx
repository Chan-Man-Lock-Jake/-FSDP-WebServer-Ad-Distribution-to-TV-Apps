import React from "react";
import "./ViewAdCampaignCard.css";

type AdCampaignCardProps = {
  image: string;
  name: string;
  created_on: string;
  date: string;
  onClick: () => void;
};

const isVideoFile = (fileUrl: string): boolean => {
  try {
    const extension = new URL(fileUrl).pathname.split(".").pop()?.toLowerCase();
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
    return videoExtensions.includes(extension || "");
  } catch (error) {
    console.error("Error parsing URL:", error);
    return false;
  }
};

const getVideoMimeType = (fileUrl: string): string => {
  try {
    const extension = new URL(fileUrl).pathname.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "mp4":
        return "video/mp4";
      case "mov":
        return "video/quicktime";
      case "avi":
        return "video/x-msvideo";
      case "mkv":
        return "video/x-matroska";
      case "webm":
        return "video/webm";
      default:
        return "video/mp4";
    }
  } catch (error) {
    console.error("Error determining MIME type:", error);
    return "video/mp4";
  }
};

const AdCampaignCard: React.FC<AdCampaignCardProps> = ({
  image,
  name,
  created_on,
  date,
  onClick,
}) => {
  const video = isVideoFile(image);

  return (
    <li className="ad-campaign-card" onClick={onClick}>
      <div className="media-container">
        {video ? (
          <video
            muted
            playsInline
            controls={false}
            onError={(e) => {
              console.error("Video load error:", e, "Source:", image);
            }}
          >
            <source src={image} type={getVideoMimeType(image || "")} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={image} alt={name} />
        )}
      </div>
      <h2>{name}</h2>
      <div className="ad-campaign-card-footer">
        <h3>Created on: {created_on}</h3>
        <h3>Launch date: {date}</h3>
      </div>
    </li>
  );
};

export default AdCampaignCard;
