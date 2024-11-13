// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const Signup = () => {
//   const [formData, setFormData] = useState({ name: '', age: '', gender: '', email: '', password: '' });
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/signup', formData);
//       alert('Signup successful');
//       navigate('/login'); // for example, navigating to the login page after a successful action

//     } catch (error) {
//       alert('Error signing up: ' + error.response.data);
//     }
//   };

//   return (
//     <form style={{border:"1px solid black",display:"flex",flexDirection:"column",maxWidth:"300px",}} onSubmit={handleSubmit}>
//       <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//       <input type="number" placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
//       <input type="text" placeholder="Gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
//       <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//       <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', formData);
      alert('Signup successful');
      navigate('/login'); // Navigate to the login page after a successful signup
    } catch (error) {
      setError('Error signing up: ' + error.response.data);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <div className="error-message">{error}</div>} {/* Display error message if any */}
    </div>
  );
};

export default Signup;
