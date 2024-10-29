import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route - Set the starting page here */}
        <Route path="/" element={<Home />} />

        {/* Login and Sign Up Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Other Pages */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
