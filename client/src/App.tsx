import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import UserManagementTable from './components/UserManagementTable';
import MonitorUserActivity from './MonitorUserActivity';
import AdCampaignManagement from './AdCampaignManagement';
import AddNewUserForm from './components/AddNewUserForm';
import CampaignAudienceForm from './components/CampaignAudienceForm';
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
import NewCampaignForm from './NewCampaignForm';
import NextCampaignForm from './NextCampaignForm';
import AudienceDetailsForm from './components/AudienceDetailsForm';
import AdCampaignMetricSelection from './components/AdCampaignMetricSelection';
import AdSelectionForm from './components/AdSelectionForm';
import ExistingCampaigns from './ExistingCampaigns';
import CampaignSummary from './components/CampaignSummary';
import CampaignTimelineForm from './components/CampaignTimelineForm'
import CreateAd from './components/CreateAd'; // Changed from AdType to CreateAd
import ViewAdTemplate from './components/ViewAdTemplate'; // Added new page
import CreateAdTemplate from './components/CreateAdTemplate'; // Added new page
import CreateAdDetails from './components/CreateAdDetails'; // Add this import
import DisplayAd from './DisplayAd';
import PushAd from './PushAd';
import Canvas from './Canvas';

import PrivateLayout from './pages/PrivateLayout/PrivateLayout';
import PublicLayout from './pages/PublicLayout/PublicLayout';
import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateAdCampaign from './pages/Campaign/CreateAdCampaign';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      </Routes>
      {/* <Header /> */}
      {/* <BlankSpace /> */}
      <Routes>
        <Route path="/admin" element={<PrivateLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="createadcampaign" element={<CreateAdCampaign/>} />
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/admin-management" element={<SystemAdminManagement />} />
        <Route path="/add-new-user" element={<AddNewUserPage />} />
        <Route
          path="/monitor-user-activity"
          element={<MonitorUserActivity />}
        />
        <Route path="/existing-campaigns" element={<ExistingCampaigns />} />
        <Route
          path="/ad-campaign-management"
          element={<AdCampaignManagement />}
        />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/displayAd" element={<DisplayAd />} />
        <Route path="/pushAd" element={<PushAd />} />
        <Route path="/new-campaign-form" element={<NewCampaignForm />} />
        <Route path="/next-campaign-form" element={<NextCampaignForm />} />
        <Route path="/campaign-details" element={<CampaignAudienceForm />} />
        <Route
          path="/audience-details-form"
          element={<AudienceDetailsForm />}
        />
        <Route
          path="/ad-metric-selection"
          element={<AdCampaignMetricSelection />}
        />
        <Route path="/ad-selection-page" element={<AdSelectionForm />} />
        <Route path="/campaign-timeline" element={<CampaignTimelineForm />} />
        <Route path="/campaign-summary" element={<CampaignSummary />} />
        <Route path="/create-ad" element={<CreateAd />} />{" "}
        {/* Updated route for CreateAd */}
        <Route path="/view-ad-template" element={<ViewAdTemplate />} />{" "}
        {/* Added route for ViewAdTemplate */}
        <Route path="/create-ad-template" element={<CreateAdTemplate />} />{" "}
        {/* Added route for CreateAdTemplate */}
        <Route path="/create-ad-details" element={<CreateAdDetails />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/displayAd" element={<DisplayAd />} />
        <Route path="/pushAd" element={<PushAd />} />
      </Routes>
        {/* <Footer /> */}
    </Router>
  );
};

export default App;
