import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateLayout from './pages/PrivateLayout/PrivateLayout';
import PublicLayout from './pages/PublicLayout/PublicLayout';
import Landing from './pages/Landing/Landing';
import Pricing from './pages/Pricing/Pricing';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateAdCampaign from './pages/Campaign/CreateAdCampaign';
import AccountDetails from "./pages/AccountSettings/AccountDetails";
import SystemAdminManagement from './SystemAdminManagement';
import ReviewAdCampaign from './pages/Campaign/ReviewAdCampaign';
import ViewAdvertisement from './pages/Advertisement/ViewAdvertisement';
import CreateAdvertisement from './pages/Advertisement/CreateAdvertisement';
import CreateAdvertisementFixedLayoutOption from './pages/Advertisement/CreateAdvertisementFixedLayoutOption';

import CreateTvGroup from './pages/TvGroup/CreateTvGroup'; 
import ViewTvGroup from './pages/TvGroup/ViewTvGroup'; 
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="create-ad-campaign" element={<CreateAdCampaign/>} />
          <Route path="review-ad-campaign" element={<ReviewAdCampaign/>} />
          <Route path="view-advertisement" element={<ViewAdvertisement/>} /> {/* Added route for ViewAdvertisement */}
          <Route path="create-advertisement" element={<CreateAdvertisement/>} />
          <Route path="create-advertisement-fixed-layouts" element={<CreateAdvertisementFixedLayoutOption/>} />
          <Route path="createtvgroup" element={<CreateTvGroup/>} />
          <Route path="viewtvgroup" element={<ViewTvGroup/>} />
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="account-details" element={<AccountDetails />} />
        </Route>
        {/* Catch-All Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
