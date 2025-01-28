import React from "react";
import { useNavigate } from "react-router-dom";

type AdCampaignCardProps = {
  image: string;
  name: string;
  created_on: string;
  created_by: string;
  onView: () => void;
};

const AdCampaignCard: React.FC<AdCampaignCardProps> = ({
  image,
  name,
  created_on,
  created_by,
}) => {

  // const fetchAllCampaigns = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("http://localhost:3000/admin/get-ad-info");
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch: ${response.statusText}`);
  //     }
  //     const data = await response.json();

  //     const formattedAds = data.map((item: any) => ({
  //       title: item.Title,
  //       description: item.Description,
  //       status: item.Type === "Finalized" ? item.Status : undefined, // Only add status for Finalized
  //       type: item.Type,
  //     }));

  //   } catch (error) {
  //     setError("Failed to load advertisements. Please try again.");
  //     console.error("Error fetching advertisements:", error);
  //   }
  // };

  return (
    <li>
        <div><img src={image}/></div>
        <h2>{name}</h2>
        <h3>Created on: {created_on}</h3>
        <h3>Created by: {created_by}</h3>
    </li>
  );
};

export default AdCampaignCard;
