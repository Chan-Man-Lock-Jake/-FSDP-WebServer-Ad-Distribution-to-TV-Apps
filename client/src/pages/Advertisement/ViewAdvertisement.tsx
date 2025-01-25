import React, { useState } from "react";
import AdvertisementHeader from "./AdvertisementHeader";
import AdvertisementButton from "./AdvertisementButton";
import AdvertisementCard from "./AdvertisementCard";
import "./ViewAdvertisement.css";

const ViewAdvertisement: React.FC = () => {
  const ads = [
    {
      title: "McDonalds Seasonal Menu",
      description:
        "To promote the newly released seasonal menu to students in particular.",
      status: "Pushed",
    },
    {
      title: "McDonalds Seasonal Menu",
      description:
        "To promote the newly released seasonal menu to students in particular.",
      status: "Pushed",
    },
    {
      title: "McDonalds Seasonal Menu",
      description:
        "To promote the newly released seasonal menu to students in particular.",
      status: "Pushed",
    },
    // Add more advertisement items as needed
  ];

  const [filteredState, setFilteredState] = useState<
    "Pushed" | "Not Pushed" | "Scheduled"
  >("Not Pushed");

  const handleStateChange = (state: "Pushed" | "Not Pushed" | "Scheduled") => {
    setFilteredState(state);
  };

  const filteredAds = ads.filter((ad) => ad.status === filteredState);

  return (
    <div className="view-advertisements">
      <AdvertisementHeader />
      <AdvertisementButton onStateChange={handleStateChange} />
      <div className="content">
        {filteredAds.map((ad, index) => (
          <AdvertisementCard
            key={index}
            title={ad.title}
            description={ad.description}
            status={ad.status as "Pushed" | "Not Pushed" | "Scheduled"}
            onView={() => console.log(`View clicked for: ${ad.title}`)} // Pass the onView prop
          />
        ))}
      </div>
    </div>
  );
};

export default ViewAdvertisement;
