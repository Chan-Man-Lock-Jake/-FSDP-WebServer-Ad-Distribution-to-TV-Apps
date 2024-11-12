import React from 'react';
import Header from './components/Header';
import AdType from './components/AdType';
import ExistingAd from './components/ExistingAd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const ExistingAdPage: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AdType />} />
        <Route path="/existing-ads" element={<ExistingAd />} />
      </Routes>
    </Router>
  );
};

export default ExistingAdPage;
