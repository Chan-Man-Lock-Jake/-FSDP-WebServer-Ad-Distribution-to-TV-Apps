import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Pricing from './Pricing';
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import Faq from './Faq';
import BlankSpace from './components/BlankSpace';

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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
