import React, { useState } from 'react';
import './register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long, contain at least 1 number, 1 uppercase letter, and 1 special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    setErrorMessage('');
    
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed');
        return;
      }

      const data = await response.json();
      setSuccessMessage('Registration successful!');
      setErrorMessage('');

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
        
      window.location.href = '/login';

    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <div className="logo">
        <h2>NutriGo</h2><img className="leaf-img" src="/images/leaf6.png" alt="Logo" />
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>

      <p className="login-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default Register;
