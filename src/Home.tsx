import React from 'react';

const Home: React.FC = () => {
  return (
    <section id="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
            <img src="assets/nycBill.jpg" className="img-fluid" alt="Demo image" />
          </div>
          <div className="col-md-7 content-box hero-content">
            <span>Unlimited Data</span>
            <h1>Digital Innovation and the <b>Future of Digital Marketing</b></h1>
            <p>Boost your digital marketing campaigns using video advertisements</p>
            <a href="#" className="btn btn-regular">Learn more</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
