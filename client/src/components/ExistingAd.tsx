import React from 'react';
import './ExistingAd.css';

const ExistingAd: React.FC = () => {
    return (
        <div className="existing-ads-page">
          <h1>Existing Advertisements</h1>
    
          <section className="ad-section">
            <h2>Static Advertisement</h2>
            <div className="ad-grid">
              <div className="ad-card">🖼️</div>
              <div className="ad-card">🖼️</div>
              <div className="ad-card">🖼️</div>
              <div className="ad-card">🖼️</div>
            </div>
          </section>
    
          <section className="ad-section">
            <h2>Video Advertisement</h2>
            <div className="ad-grid">
              <div className="ad-card">🎥</div>
              <div className="ad-card">🎥</div>
            </div>
          </section>
    
          <section className="ad-section">
            <h2>Scrolling Text</h2>
            <div className="ad-grid">
              <div className="ad-card">📜</div>
              <div className="ad-card">📜</div>
              <div className="ad-card">📜</div>
            </div>
          </section>
        </div>
      );
    };
    
    export default ExistingAd;