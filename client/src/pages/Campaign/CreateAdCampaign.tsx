import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import Calendar from "react-calendar";
import { Link } from 'react-router-dom';
import './CreateAdCampaign.css';
import "react-calendar/dist/Calendar.css";

import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const CreateAdCampaign: React.FC = () => {
    const [calDate, setCalDate] = useState<(Date | null) | [(Date | null), (Date | null)]>(new Date());
    const [images, setImages] = useState<{ url: string; fileName: string }[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [selectedAdvertisement, setSelectedAdvertisement] = useState<{
        advertisement: { url: string; fileName: string };
    } | null>(null);
    
    const [createAdCampaignFormData, setCreateAdCampaignFormData] = useState({
        name: "",
        objective: "",
        demographic: "",
        ageRange: "",
        polls: false,
        shareRate: false,
        interactionRate: false,
        advertisement: "",
        date: `${calDate}`,
        startTime: "",
        endTime: "",
        duration: "",
        interval: "",
        // author: "",
        tvGroup: "",
        // company: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox";

        setCreateAdCampaignFormData((prev) => ({
            ...prev,
            [name]: checked ? (e.target as HTMLInputElement).checked : value,
        }));
        // console.log("Data status:", createAdCampaignFormData);
    };

    // Add this after your existing state declarations
    useEffect(() => {
        const { startTime, endTime, duration } = createAdCampaignFormData;
        
        // Only calculate if exactly two of the three values are present
        const filledValues = [startTime, endTime, duration].filter(Boolean).length;
        if (filledValues !== 2) return;
    
        if (!duration && startTime && endTime) {
            // Calculate duration if start and end times are provided
            const start = new Date(`2000/01/01 ${startTime}`).getTime();
            const end = new Date(`2000/01/01 ${endTime}`).getTime();
            let timeDiff = end - start;
            if (timeDiff < 0) timeDiff += 24 * 60 * 60 * 1000; // Add 24 hours if end is next day
            const diff = timeDiff / (1000 * 60 * 60); // Convert to hours
            
            setCreateAdCampaignFormData(prev => ({
                ...prev,
                duration: diff.toFixed(2)
            }));
        } 
        else if (!endTime && startTime && duration) {
            // Calculate end time if start time and duration are provided
            const start = new Date(`2000/01/01 ${startTime}`);
            start.setHours(start.getHours() + Number(duration));
            const end = start.toTimeString().slice(0, 5);
            
            setCreateAdCampaignFormData(prev => ({
                ...prev,
                endTime: end
            }));
        } 
        else if (!startTime && endTime && duration) {
            // Calculate start time if end time and duration are provided
            const end = new Date(`2000/01/01 ${endTime}`);
            end.setHours(end.getHours() - Number(duration));
            const start = end.toTimeString().slice(0, 5);
            
            setCreateAdCampaignFormData(prev => ({
                ...prev,
                startTime: start
            }));
        }
    }, [createAdCampaignFormData.startTime, createAdCampaignFormData.endTime, createAdCampaignFormData.duration]);

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

    const handleAdvertisementClick = (advertisement: {
        url: string;
        fileName: string;
    }) => {
        setSelectedAdvertisement({
          advertisement,
        });
        setCreateAdCampaignFormData(prev => ({
            ...prev,
            advertisement: advertisement.url
        }));
        setIsPopupVisible(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLocalStorageClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const isVideoFile = (fileName: string) => {
        const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
        const extension = fileName.split(".").pop()?.toLowerCase();
        return videoExtensions.includes(extension || "");
      };

    const createNewCampaign = async () => {
        try {
            const response = await fetch("http://localhost:3000/admin/create-campaign", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: "include",
                body: JSON.stringify(createAdCampaignFormData),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {

            }
        } catch (error) {
            console.error("Error creating new campaign: ", error);
        }
    }

    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createNewCampaign();
        const data = {
          tv: createAdCampaignFormData.tvGroup,
          ad: createAdCampaignFormData.advertisement
        }
        console.log(data);
        socket.emit("force_push_ad", data);
        // socket.to(createAdCampaignFormData.tvGroup).emit('display_ad', createAdCampaignFormData.advertisement);

        window.location.href="./view-ad-campaign";
        // window.location.href="./review-ad-campaign";
        // console.log("Form Data Submitted:", createAdCampaignFormData);
    };

    return (
        <section id='create-campaign-flow'>
            <div></div>
            <form id='create-campaign-form' onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <div>
                            <h1>Campaign Description</h1>
                            <p>Come up with a name and objective for your campaign!</p>
                        </div>
                        <div className='campaign-description'>
                            <div>
                            <h2>Campaign Name</h2>
                            <input name="name" type="text" placeholder='e.g. Christmas Specials Chicken Burger' value={createAdCampaignFormData.name} onChange={handleChange} />
                            <h2>Campaign Objective</h2>
                            <textarea name="objective" placeholder='e.g. Brand awareness/Increase sale profits/To persuade/To inform' value={createAdCampaignFormData.objective} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Demographics</h1>
                            <p>Select your demographics based on the options provided.</p>
                        </div>
                        <div className='campaign-demographic'>
                            <div>
                                <div>
                                    <a className='demographic-options'>Gender</a>
                                    <div>
                                    <select name="demographic" value={createAdCampaignFormData.demographic} onChange={handleChange} className='demographic-options'>
                                        <option value='' label='select option'></option>
                                        <option value='M'>M</option>
                                        <option value='F'>F</option>
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                                    </div>
                                </div>
                                <div>
                                    <a className='demographic-options'>Age Range</a>
                                    <div>
                                    <input name="ageRange" value={createAdCampaignFormData.ageRange} onChange={handleChange} className='demographic-options' placeholder='e.g. 15-20'/>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                                    </div>
                                </div>
                            </div>
                            {/* <select className='add-option'>
                                <option label='Add Option'></option>
                                <option>Gender</option>
                                <option>Age Range</option>
                            </select> */}
                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Performance Measurement</h1>
                            <p>Select the type of performance metrics you would like to use for your campaign.</p>                       
                        </div>
                        <div className='campaign-performance-measurement'>
                            <div>
                                <label>
                                    <input name="polls" checked={createAdCampaignFormData.polls} onChange={handleChange} type="checkbox"/>
                                    <span>Polls</span>
                                </label>
                                <label>
                                    <input name="shareRate" checked={createAdCampaignFormData.shareRate} onChange={handleChange} type="checkbox"/>
                                    <span>Share Rate</span>
                                </label>
                                <label>
                                    <input name="interactionRate" checked={createAdCampaignFormData.interactionRate} onChange={handleChange} type="checkbox"/>
                                    <span>Interaction Rate</span>
                                </label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Advertisement</h1>
                            <p>Select an advertisement you would like to use from either your local storage or your existing ones on the platform.</p>     
                        </div>
                        <div className='campaign-advertisement'>
                            <div>
                                <span>Upload From</span>
                                <div>
                                    <a onClick={() => {handleLocalStorageClick();}}>Local Storage</a>
                                    <a onClick={() => {setIsPopupVisible(true); fetchFinalizedAds();}}>Platform Storage</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <p className="popup-title">Select an Advertisement for campaign</p>
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
            Selected Advertisement
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
        </div>
      )}
                    <li>
                      <div>
                          <h1>TV Group</h1>
                          <p>Select a TV Group to assign the advertisement to.</p>     
                      </div>
                      <div className='campaign-tv-group'>
                          <div>
                              <span>Select TV Group</span>
                              <input name="tvGroup" type="text" placeholder='TV Group' value={createAdCampaignFormData.tvGroup} onChange={handleChange}/>
                              {/* <select>
                                <option></option>
                              </select> */}
                          </div>
                      </div>
                    </li>
                    <li>
                        <div>
                            <h1>Schedule Date</h1>
                            <p>Select a date to launch your campaign.</p>                        
                        </div>
                        <div className='campaign-schedule-date'>
                            <Calendar onChange={setCalDate} value={calDate} />
                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Schedule Time Slot</h1>
                            <p>Scheduled time slot for your advertisement.</p>  
                        </div>
                            <div className='campaign-schedule-time-slot'>
                                <div>
                                    <label htmlFor='start-time'>Start Time
                                    <input name="startTime" value={createAdCampaignFormData.startTime} onChange={handleChange} id='start-time' type="time"/>
                                    </label>
                                    <label htmlFor='end-time'>End Time
                                    <input name="endTime" value={createAdCampaignFormData.endTime} onChange={handleChange} id='end-time' type="time"/>
                                    </label>
                                    <label htmlFor='duration'>Duration (hours)
                                    <input name="duration" value={createAdCampaignFormData.duration} onChange={handleChange} id='duration' type="number"/>
                                    </label>
                                    <label htmlFor='interval'>Interval (hours)
                                    <input name="interval" value={createAdCampaignFormData.interval} onChange={handleChange} id='interval' type="number"/>
                                    </label>
                                </div>
                            </div>
                    </li>
                </ul>
                <a className='next-container'>
                <button type="submit" id='next-button'>Create</button>
                </a>
            </form>
        </section>
    );
}

export default CreateAdCampaign;
