import React, { useEffect, useState } from "react";
import "./ViewAdCampaign.css";
import AdCampaignCard from "./ViewAdCampaignCard";
import PopupCard from "./ViewAdCampaignPopup";

const ViewAdCampaign: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
    const [campaigns, setCampaigns] = useState<any[]>([]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const getStatus = (dateString: string) => {
        const dateData = new Date(dateString);
        const today = new Date();

        return (today.getTime() - dateData.getTime()) > 0 ? "Ongoing" : null;
    }

    const handleCardClick = (campaign: any) => {
        setSelectedCampaign(campaign); // Store the clicked campaign
        setIsPopupOpen(true);
    };

    const fetchAllCampaigns = async () => {
        try {
            const allAdCampaigns = await fetch("http://localhost:3000/admin//get-all-ad-campaign",
            {
                method: "GET",
                credentials: "include", // Ensure cookies are sent with the request
            }
            );
            if (!allAdCampaigns.ok) {
                throw new Error(`Failed to fetch: ${allAdCampaigns.statusText}`);
            }
            const allAdCampaignsData = await allAdCampaigns.json();
            setCampaigns(allAdCampaignsData.data);
        } catch (error) {
          // setError("Failed to load advertisements. Please try again.");
          console.error("Error fetching ad campaigns:", error);
        }
    };

    useEffect(() => {
        fetchAllCampaigns();
    }, []);

  return (
    <section className="view-ad-campaign">
        <h1>View Existing Campaign</h1>
        <div>
            <div>
                <input type="text" placeholder="Search Advertisement"/>
                <select name="campaign-filter" id="campaign-filter">
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <ul>
                {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                <AdCampaignCard onClick={() => handleCardClick(campaign)} image={campaign.Advertisement} name={campaign.Name} created_on={formatDate(campaign.CreationDate)} date={formatDate(campaign.Date)}/>
                ))
                ) : (
                    <p>No campaigns found.</p>
                )}
            </ul>
        </div>
        {
            isPopupOpen &&
            <PopupCard image={selectedCampaign.Advertisement} objective={selectedCampaign.Objective} tv_group={selectedCampaign.TV_Group || "No TV Group Assigned"} created_on={formatDate(selectedCampaign.CreationDate)} created_by={selectedCampaign.Author} status={getStatus(selectedCampaign.CreationDate) || "Not Launched" }  closePopup={() => setIsPopupOpen(false)}/>
        }
    </section>
  );
};

export default ViewAdCampaign;