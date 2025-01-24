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

// Routes addded by Charlotte
import ViewAdvertisement from './pages/Advertisement/ViewAdvertisement';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="createadcampaign" element={<CreateAdCampaign/>} />
          <Route path="view-advertisement" element={<ViewAdvertisement/>} /> {/* Added route for ViewAdvertisement */}
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
