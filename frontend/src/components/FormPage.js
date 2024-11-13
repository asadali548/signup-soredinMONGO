

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormPage.css'; // Import the CSS file

const FormPage = ({ token }) => {
  const [formData, setFormData] = useState({ email: '', username: '', dob: '', batch: '' });
  const [storedData, setStoredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch stored data when the component is mounted or token is updated
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:5000/form', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStoredData(response.data); // Populate stored data
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(`Error fetching data: ${error.response ? error.response.data.message || error.response.data : error.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setError('Token is missing or invalid');
    }
  }, [token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Optimistic UI Update: Immediately add the submitted data to the table
    setStoredData([...storedData, formData]);

    try {
      // Save the form data to the server (MongoDB)
      const response = await axios.post('http://localhost:5000/form', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert('Form submitted successfully');
        // Optionally, re-fetch the data from the server to ensure it matches
        const updatedDataResponse = await axios.get('http://localhost:5000/form', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStoredData(updatedDataResponse.data); // Update stored data immediately
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(`Error submitting form: ${error.response ? error.response.data.message || error.response.data : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-container">
      <h1>Student data</h1>
      {error && <p className="error-message">{error}</p>}

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="DOB"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Batch"
          value={formData.batch}
          onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      </form>

      <h2>Your Stored Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          {/* Display the stored data in a table format */}
          <table>
            <thead>
              <tr>
                <th>Index</th>
                {/* <th>Email</th> */}
                <th>Username</th>
                <th>DOB</th>
                <th>Batch</th>
              </tr>
            </thead>
            <tbody>
              {storedData.slice(0, 30).map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Show index starting from 1 */}
                  {/* <td>{data.email}</td> Show email */}
                  <td>{data.username}</td>
                  <td>{new Date(data.dob).toLocaleDateString()}</td>
                  <td>{data.batch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FormPage;
