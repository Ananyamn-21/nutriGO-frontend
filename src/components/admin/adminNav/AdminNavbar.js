
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate} from "react-router-dom"; 
import './adminnav.css'

const Navbar = (props) => {

  const navigate = useNavigate() 

  return (
    <nav className="navbar">
  <div className="logo" onClick={()=>navigate('/')} style={{cursor:"pointer"}}>
    <span>NutriGo</span>
    <img className="leaf-img" src="/images/leaf6.png" alt="Logo" />
  </div>
  
</nav>

  )
};

export default Navbar;
