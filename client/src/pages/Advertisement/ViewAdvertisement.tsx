import React, { useState, useEffect } from "react";
import AdvertisementHeader from "./AdvertisementHeader";
import AdvertisementButton from "./AdvertisementButton";
import AdvertisementCard from "./AdvertisementCard";
import "./ViewAdvertisement.css";

type Advertisement = {
  title: string;
  description: string;
  status?: "Pushed" | "Not Pushed" | "Scheduled"; 
  type: "Finalized" | "Draft";
};

const ViewAdvertisement: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [filteredType, setFilteredType] = useState<"Finalized" | "Draft">(
    "Finalized"
  );
  const [filteredState, setFilteredState] = useState<
    "Pushed" | "Not Pushed" | "Scheduled"
  >("Not Pushed");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch advertisements from the API
  const fetchAdvertisements = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/admin/get-ad-info");
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();

      const formattedAds = data.map((item: any) => ({
        title: item.Title,
        description: item.Description,
        status: item.Type === "Finalized" ? item.Status : undefined, // Only add status for Finalized
        type: item.Type,
      }));

      setAds(formattedAds);
    } catch (error) {
      setError("Failed to load advertisements. Please try again.");
      console.error("Error fetching advertisements:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch advertisements on component mount
  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const handleStateChange = (state: "Pushed" | "Not Pushed" | "Scheduled") => {
    setFilteredState(state);
  };

  const handleTypeChange = (type: "Finalized" | "Draft") => {
    setFilteredType(type);
  };

  const filteredAds = ads.filter(
    (ad) =>
      ad.type === filteredType &&
      (filteredType === "Draft" || ad.status === filteredState)
  );

  return (
    <div className="view-advertisements">
      <div>
        <AdvertisementHeader title="View Advertisements" description="" />
      </div>
      <AdvertisementButton
        onStateChange={handleStateChange}
        onTypeChange={handleTypeChange}
      />
      {error ? (
        <p className="error">{error}</p>
      ) : loading ? (
        <p>Loading advertisements...</p>
      ) : (
        <div className="view-content">
          {filteredAds.length > 0 ? (
            filteredAds.map((ad, index) => (
              <AdvertisementCard
                key={index}
                title={ad.title}
                description={ad.description}
                status={ad.status} // Undefined for Drafts
                type={ad.type}
                onView={() => console.log(`View clicked for: ${ad.title}`)}
              />
            ))
          ) : (
            <p>No advertisements available for the selected type or status.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewAdvertisement;
