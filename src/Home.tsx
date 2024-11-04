import React from 'react';
import placeholderImage from '../public/placeholderimage.jpg'; 
import './Home.css'; 

const Home: React.FC = () => {
  return (
    <div className="home-page mt-5">
      <section className="hero-section text-center py-5">
        <h1>Unleash Your <span className="highlight">Suave</span> Advertising Style Today!</h1>
        <p>Manage, customize, and deliver ads seamlessly across TV apps!</p>
        <button className="btn btn-outline-dark mt-3">Join Us</button>
      </section>
      <hr></hr>
      <section className="dashboard-placeholder my-5 text-center">
        <h2 className="mb-4">Dashboard</h2>
        <img src={placeholderImage} alt="Dashboard Placeholder" className="dashboard-image" />
      </section>
      <hr></hr>
      <section className="ad-templates-section my-5 d-flex align-items-center">
        <div className="content-placeholder">
          <img src={placeholderImage} alt="Ad Templates Placeholder" className="img-fluid content-image" />
        </div>
        <div className="content-description ms-5">
          <h3>Dynamic Ad Templates</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
          <button className="btn btn-outline-dark mt-2">Get a Sample</button>
        </div>
      </section>
      <hr></hr>
      <section className="real-time-section my-5 d-flex align-items-center">
        <div className="content-description me-5">
          <h3>Real-Time Distribution</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
        </div>
        <div className="content-placeholder">
          <img src={placeholderImage} alt="Real Time Distribution Placeholder" className="img-fluid content-image" />
        </div>
      </section>
      <hr></hr>
      <section className="advertise-ease-section my-5 text-center">
        <h2>Advertise With Ease</h2>
        <img src={placeholderImage} alt="Advertise Ease Placeholder" className="img-fluid content-image my-4" />
        <p>Show WebServer connecting to TV apps (lottie animation?)</p>
      </section>
    </div>
  );
};

export default Home;
