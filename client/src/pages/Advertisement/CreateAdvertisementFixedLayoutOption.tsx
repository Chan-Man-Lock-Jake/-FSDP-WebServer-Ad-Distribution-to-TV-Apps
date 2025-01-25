import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./CreateAdvertisementFixedLayoutOption.css";

const CreateAdvertisementFixedLayoutOption: React.FC = () => {
  const [selected, setSelected] = useState(1);

  const handleChange = (value: number) => {
    setSelected(value);
  }

  return (
    <section className="fixed-layout-options">
      <div>
        <div><h1>Fixed Layout</h1><p>Choose your fixed advertisement layout</p></div>
        <form className="fixed-layout-form" action="fixed-layout-type">
            <ul>
                <li>
                    <div className="layout_1">
                    <svg width="402" height="250" viewBox="0 0 402 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="402" height="250" fill="white"/>
                    <rect x="4" y="4" width="394" height="82" fill="#CFCFCF"/>
                    <rect x="4" y="94" width="193" height="152" fill="#CFCFCF"/>
                    <rect x="205" y="94" width="193" height="152" fill="#CFCFCF"/>
                    </svg>
                    </div>
                    <label className={`shifting-frames-lottie ${selected !== 1 ? 'disabled' : ''}`} htmlFor="1"><input type="radio" id="1" name="fixed-layout_type" value="1" checked={selected === 1} onChange={() => handleChange(1)}/>Layout 1</label>
                </li>
                <li>
                    <div className="layout_2">
                    <svg width="402" height="250" viewBox="0 0 402 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="402" y="250" width="402" height="250" transform="rotate(-180 402 250)" fill="white"/>
                    <rect x="165" y="246" width="161" height="242" transform="rotate(-180 165 246)" fill="#CFCFCF"/>
                    <rect x="398" y="246" width="225" height="117" transform="rotate(-180 398 246)" fill="#CFCFCF"/>
                    <rect x="398" y="121" width="225" height="117" transform="rotate(-180 398 121)" fill="#CFCFCF"/>
                    </svg>
                    </div>
                    <label className={`shifting-frames-lottie ${selected !== 2 ? 'disabled' : ''}`} htmlFor="2"><input type="radio" id="2" name="fixed-layout_type" value="2" checked={selected === 2} onChange={() => handleChange(2)}/>Layout 2</label>
                </li>
                <li>
                    <div className="layout_3">
                    <svg width="402" height="250" viewBox="0 0 402 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="402" y="250" width="402" height="250" transform="rotate(-180 402 250)" fill="white"/>
                    <rect x="398" y="246" width="394" height="82" transform="rotate(-180 398 246)" fill="#CFCFCF"/>
                    <rect x="398" y="156" width="193" height="152" transform="rotate(-180 398 156)" fill="#CFCFCF"/>
                    <rect x="197" y="156" width="193" height="152" transform="rotate(-180 197 156)" fill="#CFCFCF"/>
                    </svg>
                    </div>
                    <label className={`shifting-frames-lottie ${selected !== 3 ? 'disabled' : ''}`} htmlFor="3"><input type="radio" id="3" name="fixed-layout_type" value="3" checked={selected === 3} onChange={() => handleChange(3)}/>Layout 3</label>
                </li>
                <li>
                    <div className="layout_4">
                    <svg width="402" height="250" viewBox="0 0 402 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="402" height="250" fill="white"/>
                    <rect x="237" y="4" width="161" height="242" fill="#CFCFCF"/>
                    <rect x="4" y="4" width="225" height="117" fill="#CFCFCF"/>
                    <rect x="4" y="129" width="225" height="117" fill="#CFCFCF"/>
                    </svg>
                    </div>
                    <label className={`shifting-frames-lottie ${selected !== 4 ? 'disabled' : ''}`} htmlFor="4"><input type="radio" id="4" name="fixed-layout_type" value="4" checked={selected === 4} onChange={() => handleChange(4)}/>Layout 4</label>
                </li>
            </ul>
            <div>
                <Link to='../create-advertisement'><button>Back</button></Link>
                <Link to='../'><button>Next</button></Link>
            </div>
        </form>
      </div>
      <span></span>
    </section>
  );
};

export default CreateAdvertisementFixedLayoutOption;