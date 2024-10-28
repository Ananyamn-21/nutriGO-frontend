import React, { useState } from 'react';
import "./report.css";

const Report = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: ''
  });

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    fetch('http://localhost:8080/food/report', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message === 'Report submitted successfully.') {
          setMessage('Your report has been submitted. Thank you!');
          setFormData({
            name: '',
            email: '',
            problem: ''
          });
        } else {
          setMessage('There was a problem submitting your report. Please try again later.');
        }
      })
      .catch(() => {
        setMessage('Error submitting report. Please check your internet connection.');
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="report-problem-container">
      <h2>Report a Problem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Problem Description:</label>
          <textarea 
            name="problem" 
            value={formData.problem} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Report;
