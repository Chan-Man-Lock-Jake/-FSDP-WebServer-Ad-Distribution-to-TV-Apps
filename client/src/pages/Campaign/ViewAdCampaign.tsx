import React, { useEffect, useState } from "react";
import "./ViewAdCampaign.css";
import AdCampaignCard from "./ViewAdCampaignCard";
import PopupCard from "./ViewAdCampaignPopup";

const ViewAdCampaign: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  // Helper to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Helper to determine the campaign status based on a date
  const getStatus = (dateString: string) => {
    const dateData = new Date(dateString);
    const today = new Date();
    return today.getTime() - dateData.getTime() > 0 ? "Ongoing" : null;
  };

  // When a campaign card is clicked, log the campaign and open the popup.
  const handleCardClick = (campaign: any) => {
    console.log("Campaign viewed:", campaign);
    setSelectedCampaign(campaign);
    setIsPopupOpen(true);
  };

  // Fetch all campaigns from the server
  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/admin//get-all-ad-campaign",
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent with the request
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      setCampaigns(data.data);
    } catch (error) {
      console.error("Error fetching ad campaigns:", error);
    }
  };

  // Handle the update of a campaign
  const handleUpdateCampaign = async (updatedData: any) => {
    if (!selectedCampaign) return;

    try {
      const response = await fetch(
        `http://localhost:3000/admin/update-ad-campaign/${selectedCampaign.CampaignId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`);
      }

      alert("Campaign updated successfully!");
      fetchAllCampaigns(); // Refresh campaign list
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating ad campaign:", error);
    }
  };

  // Fetch campaigns on component mount
  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  return (
    <section className="view-ad-campaign">
      <h1>View Existing Campaign</h1>
      <div>
        <div>
          <input type="text" placeholder="Search Advertisement" />
          <select name="campaign-filter" id="campaign-filter">
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
        <ul>
          {campaigns.length > 0 ? (
            campaigns.map((campaign, index) => (
              <AdCampaignCard
                key={campaign.CampaignId ? campaign.CampaignId : index}
                onClick={() => handleCardClick(campaign)}
                image={campaign.Advertisement}
                name={campaign.Name}
                created_on={formatDate(campaign.CreationDate)}
                date={formatDate(campaign.Date)}
              />
            ))
          ) : (
            <p>No campaigns found.</p>
          )}
        </ul>
      </div>
      {isPopupOpen && selectedCampaign && (
        <PopupCard
          title={selectedCampaign.Name}
          image={selectedCampaign.Advertisement}
          objective={selectedCampaign.Objective}
          tv_group={selectedCampaign.TV_Group || "No TV Group Assigned"}
          demographic={selectedCampaign.Demographic || ""} // Pass demographic field here
          created_on={formatDate(selectedCampaign.CreationDate)}
          created_by={selectedCampaign.Author}
          status={getStatus(selectedCampaign.CreationDate) || "Not Launched"}
          closePopup={() => setIsPopupOpen(false)}
          onUpdate={handleUpdateCampaign} // Passing the update handler
        />
      )}
    </section>
  );
};

export default ViewAdCampaign;
