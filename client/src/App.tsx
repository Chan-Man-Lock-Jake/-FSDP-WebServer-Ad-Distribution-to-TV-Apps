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

const App: React.FC = () => {
  const currentUserRole = "Admin"; // Replace with your actual user role logic

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="createadcampaign" element={<CreateAdCampaign/>} />
          <Route path="reviewadcampaign" element={<ReviewAdCampaign/>} />
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
