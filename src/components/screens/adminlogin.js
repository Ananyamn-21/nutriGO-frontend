import './adminlogin.css';
import React, { useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8080/auth/admin/login', {
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
      localStorage.setItem('userId', data.userId)
      localStorage.setItem('userType',"Admin")
      navigate('/admin');
      window.location.reload()
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  }



  return (
    <>
    <div className="admin-button-container">
        <Link to="/login" className="admin-button" style={{textDecoration:"none"}}>
          User Login
        </Link>
      </div>
    <div className="admin-login-container">
      <div className="logo">
        <h2>NutriGo</h2>
      </div>
      

      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin SignIn</h2>
        <input
            type="text"
            placeholder="Username"
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

      </form>
    </div>
    </>
  );
}

export default AdminLogin;
