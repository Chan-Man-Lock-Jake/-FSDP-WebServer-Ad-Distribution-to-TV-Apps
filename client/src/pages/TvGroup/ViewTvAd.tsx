// ViewTvAd.tsx
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./ViewTvAd.css";

// Connect to your server (ensure the transports are set if needed)
const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

// Helper function: Determine if a URL points to a video file.
const isVideoFile = (fileUrl: string, forceVideo = false): boolean => {
  if (forceVideo) return true;
  try {
    const parsedUrl = new URL(fileUrl);
    // Extract the pathname (ignores query parameters)
    const pathname = parsedUrl.pathname; // e.g., "/finalized-advertisement/TEST TEST.webm"
    const extension = pathname.split(".").pop()?.toLowerCase();
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];
    return videoExtensions.includes(extension || "");
  } catch (error) {
    console.error("Error parsing URL:", error);
    return false;
  }
};

// Helper function: Get the proper MIME type based on the file extension.
const getVideoMimeType = (url: string): string => {
  try {
    const extension = new URL(url).pathname.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "mp4":
        return "video/mp4";
      case "mov":
        return "video/quicktime";
      case "avi":
        return "video/x-msvideo";
      case "mkv":
        return "video/x-matroska";
      case "webm":
        return "video/webm";
      default:
        return "video/mp4"; // Fallback MIME type.
    }
  } catch (error) {
    console.error("Error determining MIME type:", error);
    return "video/mp4";
  }
};

interface AdInfo {
  url: string;
  title?: string;
}

const ViewTvAd: React.FC = () => {
  const [room, setRoom] = useState<string>("");
  // Store ad data with URL and optional title.
  const [adInfo, setAdInfo] = useState<AdInfo | null>(null);
  const tvDisplayRef = useRef<HTMLDivElement>(null);

  // For debugging: force video rendering regardless of extension.
  const forceVideo = false;

  // Function to join a TV group room.
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
    } else {
      console.log("No room provided.");
    }
  };

  // Function to enter fullscreen mode.
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
      let adUrl = data.ad;
      // If data.ad is a Blob, create an object URL.
      if (data.ad instanceof Blob) {
        adUrl = URL.createObjectURL(data.ad);
      }
      // Extract title from data if available (could be data.title or data.fileName).
      const title = data.title || data.fileName;
      const newAdInfo: AdInfo = { url: adUrl, title };
      setAdInfo(newAdInfo);
      // Optionally, store the URL in localStorage.
      localStorage.setItem(`${data.tv}`, adUrl);
    });

    // Cleanup the socket listener when the component unmounts.
    return () => {
      socket.off("get_ad");
    };
  }, []);

  // Log ad data when it updates and send a logging event to the server.
  useEffect(() => {
    if (adInfo) {
      console.log("Ad Campaign Viewed:", adInfo);
      // Emit an event so your backend can record the view.
      socket.emit("log_view", adInfo);
    }
  }, [adInfo]);

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
          {adInfo ? (
            <div>
              {adInfo.title && <h2 className="ad-title">{adInfo.title}</h2>}
              {isVideoFile(adInfo.url, forceVideo) ? (
                <video
                  autoPlay
                  loop
                  controls
                  muted
                  playsInline
                  onError={(e) => console.error("Video error:", e)}
                >
                  <source
                    src={adInfo.url}
                    type={getVideoMimeType(adInfo.url)}
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={adInfo.url}
                  alt={adInfo.title || "Ad"}
                  onError={(e) => console.error("Image error:", e)}
                />
              )}
            </div>
          ) : (
            <p>No Ads displayed</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewTvAd;
