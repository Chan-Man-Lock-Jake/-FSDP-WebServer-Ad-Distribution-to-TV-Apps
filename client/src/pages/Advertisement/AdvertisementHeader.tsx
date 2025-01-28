import React from "react";
import "./AdvertisementHeader.css";

type AdvertisementHeaderProps = {
  title: string; 
  description: string;
};

const AdvertisementHeader: React.FC<AdvertisementHeaderProps> = ({ title, description }) => {
  return (
    <div className="advertisement-header">
      <div className="header-title-container">
        <p className="header-title">{title}</p>
        <p className="header-description">{description}</p>
      </div>
    </div>
  );
};

export default AdvertisementHeader;
