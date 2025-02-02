// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// // const socket = io(`http://localhost:3000/`);
// const socket = io('http://localhost:3000/', {
//     transports: ['websocket', 'polling'], // Ensure compatibility with different transports
// });

// const ViewTvAd: React.FC = () => {
//     const [room, setRoom] = useState("");
//     const [currentRoom, setCurrentRoom] = useState<string | null>(null);
//     const [adReceived, setAdReceived] = useState<string | null>(localStorage.getItem('adReceived') || null);
//     const [ad, setAd] = useState("");

//     const joinRoom = () => {
//         if (room !== "") {
//             if (currentRoom && currentRoom !== room) {
//                 console.log(`Leaving room: ${currentRoom}`);
//                 socket.emit("leaveRoom", currentRoom);  // Notify server you're leaving the room
//             }
//             console.log(`Joining room: ${room}`);
//             setCurrentRoom(room); // Update the current room state
//             socket.emit("joinRoom", room)
//         } else {
//             console.log("No Room.");
//         }
//     };

//     useEffect(() => {
//         socket.on("display_ad", (data) => {
//             //alert(data.message);
//             setAd(data);
//         });

//         // socket.on("clear_ad", () => {
//         //     localStorage.removeItem('adReceived');
//         //     setAdReceived(null);
//         //     console.log('LocalStorage cleared');
//         // });

//         return () => {
//             socket.off("display_ad");
//             // socket.off("clear_ad");
//         };
//     }, []);

//     return (
//         <section>
//             <input placeholder='TV Group' onChange={(event) => setRoom(event.target.value)}/>
//             <button onClick={joinRoom}>Join TV Group</button>
//             {ad && <img src={ad} alt="Received Ad"/>}
//         </section>
//     );
// };

// export default ViewTvAd;

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import "./ViewTvAd.css";

const socket = io('http://localhost:3000');

const ViewTvAd: React.FC = () => {
    const [room, setRoom] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const tvDisplayRef = useRef<HTMLDivElement>(null);

    const [ad, setAd] = useState<string | null>();
    // const [ad, setAd] = useState(localStorage.getItem('adReceived'));
    const [adReceived, setAdReceived] = useState<string | null>(localStorage.getItem(room) || null);

    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [selectedAdvertisement, setSelectedAdvertisement] = useState<{
        advertisement: { url: string; fileName: string };
    } | null>(null);

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

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("joinRoom", room); // Join room
        }

        // fetchAllCampaigns();
    };

    const handleAdvertisementClick = (advertisement: {
        url: string;
        fileName: string;
    }) => {
        setSelectedAdvertisement({
          advertisement,
        });
        setIsPopupVisible(false);
    };

    const isVideoFile = (fileName: string) => {
        const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
        const extension = fileName.split(".").pop()?.toLowerCase();
        return videoExtensions.includes(extension || "");
    };

    const enterFullscreen = () => {
        if (tvDisplayRef.current) {
            if (tvDisplayRef.current.requestFullscreen) {
                tvDisplayRef.current.requestFullscreen();
            } else if ((tvDisplayRef.current as any).webkitRequestFullscreen) { // For Safari
                (tvDisplayRef.current as any).webkitRequestFullscreen();
            } else if ((tvDisplayRef.current as any).msRequestFullscreen) { // For IE11
                (tvDisplayRef.current as any).msRequestFullscreen();
            }
        }
    };

    useEffect(() => {
        socket.on("get_ad", (data) => {
            localStorage.setItem(`${data.tv}`, data.ad);
            console.log(data)
            setAd(data.ad);
        });

        return () => {
            socket.off("get_ad");
        };
    }, []);

    return (
        <section className='view-tv-group'>
            <span>View TV Ad</span>
            <div>
                <h2>Join TV Group</h2>
                <input className='tv-group-input' placeholder='TV Group' onChange={(e) => setRoom(e.target.value)}/>
                <button onClick={joinRoom}>Join TV Group</button>
            </div>
            <div>
                <h2>View Ad</h2>
                <div ref={tvDisplayRef} className='TV-Display' onClick={enterFullscreen}>
                    {ad ? (
                        /* ad.endsWith(".mp4") */ isVideoFile(ad) ? (
                            <video src={ad} autoPlay loop controls />
                        ) : (
                            <img src={ad} alt="Ad" />
                        )
                    ) : (
                        <p>No Ads displayed</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ViewTvAd;
