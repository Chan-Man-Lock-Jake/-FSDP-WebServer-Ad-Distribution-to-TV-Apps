import React, { useState, useEffect } from "react";
import "./PushAdvertisement.css";
import AdvertisementHeader from "./AdvertisementHeader";
import { useNavigate } from "react-router-dom";

const tvGroups = [
  "TV Group 1",
  "TV Group 2",
  "TV Group 3",
  "TV Group 4",
  "TV Group 5",
];

const PushAdvertisement: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredTvGroups, setFilteredTvGroups] = useState<string[]>(tvGroups);
  const [selectedTvGroup, setSelectedTvGroup] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [confirmationVisible, setConfirmationVisible] =
    useState<boolean>(false);
  const [images, setImages] = useState<{ url: string; fileName: string }[]>([]);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState<{
    tvGroup: string;
    advertisement: { url: string; fileName: string };
  } | null>(null);
  const navigate = useNavigate();

  const handleStorageSelection = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = (event: any) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        if (!selectedTvGroup) {
          alert("Please select a TV Group first!");
          return;
        }
        const localFileUrl = URL.createObjectURL(file);
        setSelectedAdvertisement({
          tvGroup: selectedTvGroup,
          advertisement: { url: localFileUrl, fileName: file.name },
        });
      }
    };
    input.click();
  };

//   useEffect(() => {
//     const fetchSessionAndAds = async () => {
//       try {
//         const sessionResponse = await fetch("http://localhost:3000/session", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (!sessionResponse.ok) {
//           throw new Error("Failed to retrieve session data.");
//         }

//         const sessionData = await sessionResponse.json();
//         console.log("Session Data:", sessionData);

//         if (sessionData.success) {
//           fetchFinalizedAds(); // Fetch ads only if session is valid
//         } else {
//           console.error("Session invalid or missing.");
//         }
//       } catch (error) {
//         console.error("Error fetching session:", error);
//       }
//     };

//     fetchSessionAndAds(); // Execute on component mount
//   }, []);


  const fetchFinalizedAds = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/admin/get-all-finalized-ad",
        {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch finalized ads.");
      }
      
      const data = await response.json();

      if (data.success && data.data) {
        console.log("Fetched Ads:", data.data);
        setImages(data.data); // Update the state with fetched ads
      } else {
        console.error("No finalized ads found.");
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching finalized ads:", error);
    }
  };


  useEffect(() => {
    console.log("Initialized");
    fetchFinalizedAds(); // Fetch ads on component mount
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchInput(value);

    setFilteredTvGroups(
      tvGroups.filter((group) =>
        group.toLowerCase().includes(value.toLowerCase())
      )
    );
    setDropdownVisible(value !== "");
  };

  const handleTvGroupSelect = (group: string) => {
    setSelectedTvGroup(group);
    setSearchInput(group);
    setDropdownVisible(false);

    // Update the selected advertisement's TV group if already selected
    if (selectedAdvertisement) {
      setSelectedAdvertisement((prev) => ({
        ...prev!,
        tvGroup: group,
      }));
    }
  };

  const handleAdvertisementClick = (advertisement: {
    url: string;
    fileName: string;
  }) => {
    if (!selectedTvGroup) {
      alert("Please select a TV Group first!");
      return;
    }
    setSelectedAdvertisement({
      tvGroup: selectedTvGroup,
      advertisement,
    });
    setIsPopupVisible(false);
  };

  const isVideoFile = (fileName: string) => {
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
    const extension = fileName.split(".").pop()?.toLowerCase();
    return videoExtensions.includes(extension || "");
  };

  const handleConfirmPush = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/admin/uploadToSocket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tvGroup: selectedAdvertisement!.tvGroup,
            advertisement: {
              url: selectedAdvertisement!.advertisement.url,
              fileName: selectedAdvertisement!.advertisement.fileName,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to push the advertisement. Please try again.");
      }

      const result = await response.json();

      if (result.success) {
        alert("Advertisement pushed successfully!");
        setConfirmationVisible(false);
        window.location.reload();
      } else {
        alert("Failed to push the advertisement. Please try again.");
      }
    } catch (error) {
      console.error("Error pushing advertisement:", error);
      alert(
        "An error occurred while pushing the advertisement. Please try again."
      );
    }
  };

  const handlePushClick = () => {
    if (!selectedAdvertisement) {
      alert("Please select an advertisement first!");
      return;
    }
    setConfirmationVisible(true);
  };

  return (
    <div className="push-advertisement">
      <AdvertisementHeader
        title="Push Advertisement"
        description="Select an advertisement to push now"
      />

      <div className="push-content">
        <div className="advertisement-container">
          <p>Select TV Group to push advertisement to</p>
          <div className="dropdown-container">
            <input
              type="text"
              placeholder="Search for a TV Group"
              value={searchInput}
              onChange={handleSearchInputChange}
              className="search-input"
            />
            {dropdownVisible && (
              <div className="dropdown">
                {filteredTvGroups.map((group, index) => (
                  <div
                    key={index}
                    className={`dropdown-item ${
                      selectedTvGroup === group ? "selected" : ""
                    }`}
                    onClick={() => handleTvGroupSelect(group)}
                  >
                    {group}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="advertisement-container">
          <p>Choose storage to upload advertisement from</p>
          <div className="upload-container">
            <button className="storage-button" onClick={handleStorageSelection}>
              Local Storage
            </button>
            <button
              className="storage-button"
              onClick={() => {
                setIsPopupVisible(true);
                fetchFinalizedAds();
              }}
            >
              Platform Storage
            </button>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <p className="popup-title">Select an Advertisement to Push</p>
            <div className="popup-content">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <div
                    key={index}
                    className="popup-ad"
                    onClick={() => handleAdvertisementClick(image)}
                  >
                    {isVideoFile(image.fileName) ? (
                      <video src={image.url} controls className="popup-image" />
                    ) : (
                      <img
                        src={image.url}
                        alt={`Advertisement ${index + 1}`}
                        className="popup-image"
                      />
                    )}
                    <p className="ad-name">
                      {image.fileName.replace(/\.[^/.]+$/, "")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="popup-title">No advertisements found.</p>
              )}
            </div>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="close-popup"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedAdvertisement && (
        <div className="selected-ads-container">
          <p className="selected-ad-title">
            Selected Advertisement and TV Group
          </p>
          {isVideoFile(selectedAdvertisement.advertisement.fileName) ? (
            <video
              src={selectedAdvertisement.advertisement.url}
              controls
              className="selected-image"
            />
          ) : (
            <img
              src={selectedAdvertisement.advertisement.url}
              alt={selectedAdvertisement.advertisement.fileName}
              className="selected-image"
            />
          )}
          <p className="selected-items">
            Advertisement:&nbsp;
            {selectedAdvertisement.advertisement.fileName.replace(
              /\.[^/.]+$/,
              ""
            )}
          </p>
          <p className="selected-items">
            TV Group:&nbsp;{selectedAdvertisement.tvGroup}
          </p>
        </div>
      )}

      <div className="push-bttn-container">
        <button className="push-button" onClick={handlePushClick}>
          Push
        </button>
      </div>

      {confirmationVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <p className="popup-title">Confirm Push</p>
            <p className="popup-text">
              Are you sure you want to push this advertisement without setting
              up a campaign?
            </p>
            <p className="popup-text">
              If not,{" "}
              <span
                className="popup-link"
                onClick={() => navigate("/admin/create-ad-campaign")}
              >
                click here
              </span>{" "}
              to create a campaign.
            </p>
            <div className="popup-buttons">
              <button
                className="cancel-button"
                onClick={() => setConfirmationVisible(false)}
              >
                Cancel
              </button>
              <button className="push-button" onClick={handleConfirmPush}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PushAdvertisement;
