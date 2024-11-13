// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const Login = ({ setToken }) => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await axios.post('http://localhost:5000/login', formData);
//   //     setToken(response.data.token);
//   //     alert('Login successful');
//   //     navigate('/form');
//   //   } catch (error) {
//   //     alert('Error logging in: ' + error.response.data);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', formData);
//       setToken(response.data.token); // Assuming setToken is passed as a prop and used for managing tokens.
//       alert('Login successful');
//       navigate('/form');
//     } catch (error) {
//       const errorMessage = error.response && error.response.data 
//         ? error.response.data 
//         : 'An error occurred while logging in';
//       alert('Error logging in: ' + errorMessage);
//     }
//   };
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//       <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      setToken(response.data.token); // Assuming setToken is passed as a prop and used for managing tokens.
      alert('Login successful');
      navigate('/form');
    } catch (error) {
      const errorMessage = error.response && error.response.data 
        ? error.response.data 
        : 'An error occurred while logging in';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
    </div>
  );
};

export default Login;
