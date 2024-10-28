import React, { useState } from 'react';
import "./feedback.css";
import Navbar from '../navbar/Navbar';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

  
    if (!name || !email || !feedback) {
      setError('All fields are required.');
      return;
    }

    const feedbackData = {
      name,
      email,
      feedback,
    };

    try {
      const response = await fetch('http://localhost:8080/food/feedback', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setName('');
      setEmail('');
      setFeedback('');
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Error submitting feedback. Please try again later.');
    }
  };

  return (
    <>
      <Navbar/>
      <div className="feedback-form">
        <h2>Feedback Form</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </>
  );
};

export default Feedback;
