
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate} from "react-router-dom"; 
import './nav.css'

const Navbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const navigate = useNavigate() 

  const username = localStorage.getItem('username')
 

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
    window.location.reload()
  };


  return (
  <nav className="navbar">
  <div className="logo" onClick={()=>navigate('/')} style={{cursor:"pointer"}}>
    <span>NutriGo</span>
    <img className="leaf-img" src="/images/leaf6.png" alt="Logo" />
  </div>

  <div className="nav-search-container">
    
    <img src='/images/userHome2.png'/>
   
    <Link  style={{textDecoration:"none",color:"#53e726",paddingTop:"19px",paddingLeft:"5px"}} onClick={toggleDropdown} ><h3>Welcome, {username}</h3></Link>
    
    {showDropdown && (
     
      <div className="dropdown-menu">
        <ul>
          <li>
            <Link to="/userprofile">Profile</Link>
          </li>
          <li>
            <Link to="/daily">My Meals</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
     
    
    )}
  </div>
  
</nav>

  )
};

export default Navbar;
