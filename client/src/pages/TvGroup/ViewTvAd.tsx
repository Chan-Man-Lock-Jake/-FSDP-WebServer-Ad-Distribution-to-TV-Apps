import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./ViewTvAd.css";

// Connect to your server (ensure the transports are set if needed)
const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

const ViewTvAd: React.FC = () => {
  const [room, setRoom] = useState("");
  const [ad, setAd] = useState<string | null>(null);
  const tvDisplayRef = useRef<HTMLDivElement>(null);

  // For debugging: force video rendering (set to true to test video rendering regardless of extension)
  const forceVideo = false;

  // Helper function to check if the given file name corresponds to a video.
  const isVideoFile = (fileName: string) => {
    if (forceVideo) return true;
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
    const extension = fileName.split(".").pop()?.toLowerCase();
    return videoExtensions.includes(extension || "");
  };

  // Join a TV group room.
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
    } else {
      console.log("No room provided.");
    }
  };

  // Enter fullscreen mode for the TV display div.
  const enterFullscreen = () => {
    if (tvDisplayRef.current) {
      if (tvDisplayRef.current.requestFullscreen) {
        tvDisplayRef.current.requestFullscreen();
      } else if ((tvDisplayRef.current as any).webkitRequestFullscreen) {
        (tvDisplayRef.current as any).webkitRequestFullscreen();
      } else if ((tvDisplayRef.current as any).msRequestFullscreen) {
        (tvDisplayRef.current as any).msRequestFullscreen();
      }
    }
  };

  // Listen for ad data from the server.
  useEffect(() => {
    socket.on("get_ad", (data) => {
      console.log("Received ad data:", data);
      // Check if data.ad is a Blob; if so, convert it to an object URL.
      let adUrl = data.ad;
      if (data.ad instanceof Blob) {
        adUrl = URL.createObjectURL(data.ad);
      }
      // Save the URL to localStorage (if needed)
      localStorage.setItem(`${data.tv}`, adUrl);
      setAd(adUrl);
    });

    return () => {
      socket.off("get_ad");
    };
  }, []);

  // Log the ad URL when it changes.
  useEffect(() => {
    console.log("Ad URL:", ad);
  }, [ad]);

  return (
    <section className="view-tv-group">
      <h1>View TV Ad</h1>
      <div>
        <h2>Join TV Group</h2>
        <input
          className="tv-group-input"
          placeholder="TV Group"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join TV Group</button>
      </div>
      <div>
        <h2>View Ad</h2>
        <div
          ref={tvDisplayRef}
          className="TV-Display"
          onClick={enterFullscreen}
        >
          {ad ? (
            isVideoFile(ad) ? (
              <video
                autoPlay
                loop
                controls
                muted
                playsInline
                onError={(e) => console.error("Video error:", e)}
              >
                <source src={ad} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={ad}
                alt="Ad"
                onError={(e) => console.error("Image error:", e)}
              />
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
