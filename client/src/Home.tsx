import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './Features';
import Footer from './components/Footer';
import BlankSpace from './components/BlankSpace';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
