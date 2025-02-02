import React from "react";

type AdCampaignCardProps = {
  image: string;
  name: string;
  created_on: string;
  date: string;
  onClick: () => void;
  // onView: () => void;
};

const AdCampaignCard: React.FC<AdCampaignCardProps> = ({
  image,
  name,
  created_on,
  date,
  onClick,
}) => {

  return (
    <li onClick={onClick}>
        <div><img src={image}/></div>
        <h2>{name}</h2>
        <h3>Created on: {created_on}</h3>
        <h3>Launch date: {date}</h3>
    </li>
  );
};

export default AdCampaignCard;
