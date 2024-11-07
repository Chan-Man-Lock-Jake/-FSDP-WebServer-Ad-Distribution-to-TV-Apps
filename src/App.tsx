import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Pricing from './Pricing';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Faq from './Faq';
import BlankSpace from './components/BlankSpace';
import SystemAdminManagement from './SystemAdminManagement';

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
      </Routes>
    </Router>
  );
};

export default App;
