import React from 'react';
import '../css/Signup.css';
import SignUpFormBox from './SignUpFormBox';
import placeholderImage from '../../public/placeholderimage.jpg';


const SignUpContainer: React.FC = () => {
  return (
    <div className="signup-page-container">
      <div className="placeholder-image-container">
        <img src={placeholderImage} alt="Placeholder" className="placeholder-image" />
      </div>
      <SignUpFormBox />
    </div>
  );
};

export default SignUpContainer;
