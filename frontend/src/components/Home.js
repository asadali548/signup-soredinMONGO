import React from 'react';

import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="Home-container">
      <h1 className="heading">Welcome to the Home Page</h1>
      <div className="div-buttons">
      <Link to="/signup">
        <button className="home-buttons">Sign Up</button>
      </Link>
      <Link to="/login">
        <button className="home-buttons">Login</button>
      </Link>
      </div>
    </div>
  );
};

export default Home;
