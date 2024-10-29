import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <p className="text-center mt-4">
            <Link to="/login" className="text-primary">
                Login/Signup Here
            </Link>
        </p>
    </div>
  );
};

export default Home;
