import React from 'react';
import './AdType.css';

const AdType: React.FC = () => {
  return (
    <main className="advertisement-type">
      <div className="advertisement-card">Create Advertisement</div>
      <a href="/existingad">
      <div className="advertisement-card">Existing Advertisements</div>
      </a>
    </main>
  );
};

export default AdType;