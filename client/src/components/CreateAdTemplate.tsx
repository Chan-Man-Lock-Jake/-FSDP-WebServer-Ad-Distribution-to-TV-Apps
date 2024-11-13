import React, { useState } from 'react';
import '../css/CreateAdTemplate.css';

const CreateAdTemplate: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      const fileExtension = selectedFile.name.split('.').pop();
      if (fileExtension) {
        // Determine file type
        const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
        const videoExtensions = ['mp4', 'webm', 'ogg'];
        const textExtensions = ['txt'];

        if (imageExtensions.includes(fileExtension.toLowerCase())) {
          setFileType('Static Advertisement');
        } else if (videoExtensions.includes(fileExtension.toLowerCase())) {
          setFileType('Video Advertisement');
        } else if (textExtensions.includes(fileExtension.toLowerCase())) {
          setFileType('Scrolling Text');
        } else {
          setFileType('Unknown Type');
        }
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !description || !file) {
      alert('Please fill out all fields and upload a file.');
      return;
    }

    // Handle form submission, e.g., send data to backend or display success message
    alert(`Template Created! Name: ${name}, Description: ${description}, File Type: ${fileType}`);
  };

  return (
    <div className="create-ad-template-container">
      <div className="back-link">
        <a href="/ad-type"> &lt;&lt; back </a>
      </div>

      <h1 className="create-ad-title">Create Ad Template</h1>
      <form className="create-ad-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file-upload" className="file-upload-container">
            <div className="file-placeholder">
              {file ? file.name : <span className="file-upload-icon">📄 +</span>}
            </div>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
        </div>
        <button type="submit" className="create-button">Create Template</button>
      </form>

      {fileType && (
        <div className="file-type">
          <strong>File Type Detected:</strong> {fileType}
        </div>
      )}
    </div>
  );
};

export default CreateAdTemplate;
