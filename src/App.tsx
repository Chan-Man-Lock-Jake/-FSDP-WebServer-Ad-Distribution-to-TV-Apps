import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Home from './Home';
import Features from './Features';
import Pricing from './Pricing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main className="main-content mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>

      {/* Footer Component */}
      <Footer />
    </Router>
  );
};

export default App;
