import React from 'react';
import LoginContainer from './components/LoginContainer'; // Import LoginContainer component
import BlankSpace from './components/BlankSpace';

const LoginForm: React.FC = () => {
  return (
    <div>
      <BlankSpace />
      <LoginContainer />
    </div>
  );
};

export default LoginForm;
