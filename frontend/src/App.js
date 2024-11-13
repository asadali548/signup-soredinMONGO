

import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import FormPage from './components/FormPage';

function App() {
  const [token, setToken] = useState(null); // State to hold the token

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} /> {/* Pass setToken */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<FormPage token={token} />} /> {/* Pass token */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
