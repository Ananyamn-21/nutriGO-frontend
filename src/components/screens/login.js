
import './style.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();

     
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('flag', data.flag);
      localStorage.setItem('userType',"User")
      
      navigate('/')
      window.location.reload()

    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="admin-button-container">
        <Link to="/adminlogin" className="admin-button" style={{textDecoration:"none"}} >
          Admin
        </Link>
      </div>

      <div className="login-container">
        <div className="logo">
          <h2>NutriGo</h2><img className="leaf-img" src="/images/leaf6.png" alt="Logo" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>SignIn</h2>
          <input
            type="text"
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
          <button type="submit">Login</button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p className="register-link">
            New here? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
