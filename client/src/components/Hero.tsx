import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="hero-section text-center py-5">
      <h1>Unleash Your <span className="highlight">Suave</span> Advertising Style Today!</h1>
      <p>Manage, customize, and deliver ads seamlessly across TV apps!</p>
      <Link className="btn btn-outline-dark mt-3" to="/usermanagement">Join Us</Link>
    </section>
  );
};

export default Hero;
