import React from 'react';
import '../css/LoginForm.css';
import LoginFormBox from './LoginFormBox';
import placeholderImage from '../../public/placeholderimage.jpg';


const LoginContainer: React.FC = () => {
  return (
    <div className="login-page-container">
      <div className="placeholder-image-container">
        <img src={placeholderImage} alt="Placeholder" className="placeholder-image" />
      </div>
      <LoginFormBox />
    </div>
  );
};

export default LoginContainer;
