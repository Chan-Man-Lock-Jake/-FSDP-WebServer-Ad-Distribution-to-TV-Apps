// client/src/components/CreateAdDetails.tsx
import React, { useState } from 'react';
import '../css/CreateAdDetails.css';

const CreateAdDetails: React.FC = () => {
  const [adName, setAdName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [createAdNow, setCreateAdNow] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!adName || !description || (!createAdNow && !uploadedFile)) {
      alert('Please complete all fields before submitting.');
      return;
    }

    const adType = determineAdType(uploadedFile?.name);
    console.log('Ad Name:', adName);
    console.log('Description:', description);
    if (uploadedFile) {
      console.log('Uploaded File:', uploadedFile.name);
      console.log('Ad Type:', adType);
    }
    console.log('Create Ad Now:', createAdNow);

    // TODO: Add logic to save this information to the database
    alert('Ad details have been saved successfully!');
  };

  const determineAdType = (fileName?: string) => {
    if (!fileName) return 'Unknown';
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    switch (fileExtension) {
      case 'png':
      case 'jpeg':
      case 'jpg':
      case 'gif':
      case 'svg':
        return 'Static Image';
      case 'mp4':
      case 'mov':
      case 'avi':
        return 'Video';
      case 'html':
      case 'js':
        return 'Interactive';
      case 'txt':
      case 'rtf':
        return 'Scrolling Text';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="create-ad-details-container">
      <a href="/create-ad-template" className="back-link">&lt;&lt; Back</a>
      <h1 className="ad-details-title">Create Ad Template</h1>

      <div className="form-group">
        <label htmlFor="adName">Name</label>
        <input
          type="text"
          id="adName"
          placeholder="Enter ad name"
          value={adName}
          onChange={(e) => setAdName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter ad description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group checkbox-container">
        <input
          type="checkbox"
          id="createAdNow"
          checked={createAdNow}
          onChange={() => setCreateAdNow(!createAdNow)}
        />
        <label htmlFor="createAdNow">Create Ad Now (Skip File Upload)</label>
      </div>

      {!createAdNow && (
        <div className="form-group file-upload">
          <label htmlFor="fileUpload" className="file-upload-label">
            <div className="file-icon">+</div>
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileUpload}
          />
          {uploadedFile && <p>Uploaded File: {uploadedFile.name}</p>}
        </div>
      )}

      <button className="save-button" onClick={handleSubmit}>
        Save Ad Template
      </button>
    </div>
  );
};

export default CreateAdDetails;
