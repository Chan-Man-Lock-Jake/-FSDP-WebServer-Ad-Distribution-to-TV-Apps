import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import UserManagementTable from './components/UserManagementTable';
import MonitorUserActivity from './MonitorUserActivity';
import AdCampaignManagement from './AdCampaignManagement';
import AddNewUserForm from './components/AddNewUserForm';
import AddNewUserPage from './AddNewUserPage';
import Home from './Home';
import Pricing from './Pricing';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Faq from './Faq';
import UserManagement from './UserManagement';
import BlankSpace from './components/BlankSpace';
import SystemAdminManagement from './SystemAdminManagement';
import CreateCampaign from './CreateCampaign';
import DisplayAd from './DisplayAd';
import PushAd from './PushAd';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <BlankSpace />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/admin-management" element={<SystemAdminManagement />} />
        <Route path="/add-new-user" element={<AddNewUserPage />} />
        <Route path="/monitor-user-activity" element={<MonitorUserActivity />} />
        <Route path="/ad-campaign-management" element={<AdCampaignManagement />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/usermanagement" element={<UserManagement/>} />
        <Route path="/displayAd" element={<DisplayAd />} />
        <Route path="/pushAd" element={<PushAd />} />
      </Routes>
    </Router>
  );
};

export default App;
