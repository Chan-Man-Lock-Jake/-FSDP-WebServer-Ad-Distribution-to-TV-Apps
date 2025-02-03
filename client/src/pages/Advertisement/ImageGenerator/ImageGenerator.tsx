import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../ImageGeneratorAssets/suave_logo.svg";

// Helper function to sanitize the prompt text for use as a file name.
const sanitizePromptForFilename = (prompt: string): string => {
  return prompt
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase();
};

const ImageGenerator: React.FC = () => {
  const [image_url, setImage_url] = useState("/");
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to generate an image using OpenAI's API.
  const imageGenerator = async () => {
    if (!inputRef.current || inputRef.current.value.trim() === "") {
      console.log("Prompt is empty.");
      return;
    }

    try {
      const payload = {
        prompt: inputRef.current.value,
        n: 1,
        size: "512x512",
      };

      console.log("Request payload:", payload);

      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_IMAGE_API_KEY}`, // Uses Vite's environment variable
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) {
        throw new Error(
          data.error ? data.error.message : "Unknown error occurred"
        );
      }

      if (data.data && data.data.length > 0) {
        setImage_url(data.data[0].url);
      }
    } catch (error: any) {
      console.error("Error generating image:", error.message);
    }
  };

  // Function to upload the finalized ad using a proxy endpoint.
  const handleUploadFinalizedAd = async () => {
    if (image_url === "/") {
      alert("No image available to upload.");
      return;
    }

    if (!inputRef.current || inputRef.current.value.trim() === "") {
      alert("No prompt provided for file naming.");
      return;
    }

    try {
      // Use the proxy endpoint to bypass CORS.
      const proxyUrl = `http://localhost:3000/proxy-image?url=${encodeURIComponent(
        image_url
      )}`;
      const imageResponse = await fetch(proxyUrl);
      if (!imageResponse.ok) {
        throw new Error("Could not retrieve image for upload.");
      }
      const blob = await imageResponse.blob();

      // Determine file extension (default to "png")
      let extension = "png";
      try {
        // Remove query parameters.
        const urlWithoutQuery = image_url.split("?")[0];
        // Get the file name part (everything after the last "/")
        const fileNamePart = urlWithoutQuery.substring(
          urlWithoutQuery.lastIndexOf("/") + 1
        );
        const parts = fileNamePart.split(".");
        if (parts.length > 1) {
          extension = parts[parts.length - 1] || "png";
        }
      } catch (err) {
        console.warn("Unable to determine file extension, defaulting to png");
      }

      // Compute the file name from the prompt text.
      const sanitizedPrompt = sanitizePromptForFilename(inputRef.current.value);
      const computedFileName = `${sanitizedPrompt}.${extension}`;
      console.log("Final file name:", computedFileName);

      // Create FormData and append the file under key "file"
      // Also include fileName as a separate field if your backend expects it.
      const formData = new FormData();
      formData.append("file", blob, computedFileName);
      formData.append("fileName", computedFileName);

      const uploadResponse = await fetch(
        "http://localhost:3000/admin/upload-finalized-ad",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      const uploadData = await uploadResponse.json();
      console.log("Upload finalized ad result:", uploadData);
      alert("Finalized ad uploaded successfully!");
    } catch (error: any) {
      console.error("Error uploading finalized ad:", error.message);
      alert(`Error uploading finalized ad: ${error.message}`);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="image-generator-header">
        <h1>AI Image generator</h1>
        <div className="img-loading">
          <div className="image">
            <img
              src={image_url === "/" ? default_image : image_url}
              alt="default-img"
            />
          </div>
        </div>
      </div>
      <div className="ai-search-box">
        <input
          type="text"
          ref={inputRef}
          className="ad-image-text"
          placeholder="Describe your desired image"
        />
        <div className="ad-generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
      <div className="upload-finalized-ad-btn-container">
        <button
          className="upload-finalized-ad-btn"
          onClick={handleUploadFinalizedAd}
        >
          Upload as Ad
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
