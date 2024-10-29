import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="marketing">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="content-box">
              <span>Organic Search Report</span>
              <h2>Search Insights</h2>
              <p>Grow your search traffic, and monitor your ranking in real time.</p>
              <a href="#" className="btn btn-regular">Get a quote</a>
            </div>
          </div>
          <div className="col-md-7">
            <img src="images/demo-image.png" className="img-fluid" alt="Demo image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
