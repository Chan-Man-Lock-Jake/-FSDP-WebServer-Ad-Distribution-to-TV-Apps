import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for navigation
import "../css/AdSelectionForm.css";

const AdSelectionForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Create the navigate function

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Handle upload request
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("adFile", file); // Upload field name for Multer
    formData.append("bucketName", "flowers.co"); // Your bucket name
    formData.append("folderName", "advertisement"); // Your folder name

    try {
      setLoading(true);
      setError(null); // Reset error state

      const response = await axios.post(
        "http://localhost:3000/admin/upload-ad",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Tell the backend to expect a file upload
          },
        }
      );

      // Handle success
      alert("File uploaded successfully!");
      setFile(null); // Clear the file input after successful upload
    } catch (err: any) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle "Create Ad" button click
  const handleCreateAd = () => {
    navigate("/canvas"); // Navigate to the Canvas page
  };

  return (
    <div className="ad-selection-page">
      <div className="ad-selection-container">
        <h1 className="ad-selection-title">Ad Campaign</h1>
        <p className="ad-selection-subtitle">Select your advertisement</p>

        {/* Box for the file input and button */}
        <div className="ad-box">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={loading} // Disable file input while uploading
          />
          <button onClick={handleUpload} disabled={!file || loading}>
            {loading ? "Uploading..." : "Upload Ad"}
          </button>
          <button onClick={handleCreateAd}>Create Ad</button>
        </div>

        {/* Display any error message */}
        {error && <p className="error-message">{error}</p>}
        <div className="navigation-buttons">
          <Link to="/ad-metric-selection">
            <button className="previous-button">Previous</button>
          </Link>
          <Link to="/campaign-timeline">
            <button className="next-button">Next</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdSelectionForm;
