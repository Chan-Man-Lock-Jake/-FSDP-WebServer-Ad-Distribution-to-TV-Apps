import React from 'react';
import { Link } from 'react-router-dom';
import '../css/CreateAd.css';

const CreateAd: React.FC = () => {
  return (
    <div className="ad-container">
      <h1 className="ad-title">Existing Advertisements</h1>
      
      <div className="ad-template-buttons">
        <Link to="/view-ad-template">
          <button className="template-button">View Ad Template</button>
        </Link>
        <Link to="/create-ad-template">
          <button className="template-button">Create Ad Template</button>
        </Link>
      </div>

      <section className="ad-section">
        <h2 className="ad-subtitle">Static Advertisement</h2>
        <div className="ad-card-container">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="ad-placeholder static-ad-placeholder">
              <span className="icon-placeholder">🖼️</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ad-section">
        <h2 className="ad-subtitle">Video Advertisement</h2>
        <div className="ad-card-container">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="ad-placeholder video-ad-placeholder">
              <span className="icon-placeholder">🎥</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ad-section">
        <h2 className="ad-subtitle">Scrolling Text</h2>
        <div className="ad-card-container">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="ad-placeholder text-ad-placeholder">
              <span className="icon-placeholder">📜</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreateAd;
