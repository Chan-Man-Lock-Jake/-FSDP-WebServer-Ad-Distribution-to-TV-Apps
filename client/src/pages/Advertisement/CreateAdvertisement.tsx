import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import "./CreateAdvertisement.css";
import shiftingImages from "../../assets/lottie/shiftingImages.json";
import shiftingFrames from "../../assets/lottie/shiftingFrames.json";

const CreateAdvertisement: React.FC = () => {
  const [selected, setSelected] = useState<string | null>('dynamic');

  const handleChange = (value: string) => {
    setSelected(value);
  };

  return (
    <section className="create-advertisements">
      <div>
        <div>
          <h1>Advertisement Layout</h1>
          <p>Choose your advertisement layout</p>
        </div>
        <form className="layout-form" action="layout-type">
          <div className="layout-options">
            <div className={`shifting-images-lottie ${selected !== 'dynamic' ? 'disabled' : ''}`}>
              <div>
                <Lottie animationData={shiftingImages} loop={selected === "dynamic"} />
              </div>
              <label htmlFor="dynamic">
                <input
                  type="radio"
                  id="dynamic"
                  name="layout_type"
                  value="dynamic"
                  checked={selected === 'dynamic'}
                  onChange={() => handleChange('dynamic')}
                />
                Dynamic Layout
              </label>
              <p>
                Place images and videos anywhere on the canvas with complete
                freedom to design your ad display as you like.
              </p>
            </div>
            <div className={`shifting-frames-lottie ${selected !== 'fixed' ? 'disabled' : ''}`}>
              <div>
                <Lottie animationData={shiftingFrames} loop={selected === "fixed"} />
              </div>
              <label htmlFor="fixed">
                <input
                  type="radio"
                  id="fixed"
                  name="layout_type"
                  value="fixed"
                  checked={selected === 'fixed'}
                  onChange={() => handleChange('fixed')}
                />
                Fixed Layout
              </label>
              <p>
                Place images and videos within a structured grid for a clean and
                organized ad display.
              </p>
            </div>
          </div>
          <Link to={selected === 'dynamic' ? '../create-advertisement-dynamic' : '../create-advertisement-fixed-layouts'}>
            <button type="button">Next</button>
          </Link>
        </form>
      </div>
      <span></span>
    </section>
  );
};

export default CreateAdvertisement;
