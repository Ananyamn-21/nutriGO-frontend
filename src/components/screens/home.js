
import React, { useState, useEffect, useRef } from 'react';
import "./home.css"
import { Link, useNavigate} from "react-router-dom"; 

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(true);   
  const navigate = useNavigate()   
  const username = localStorage.getItem('username')
  const flag = localStorage.getItem('flag')

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


  useEffect(() => {
    fetchRecipes();
  }, []);


  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:8080/food/getAllRecipes');
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchRecipesByIngredients = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`http://localhost:8080/food/search/${searchQuery}`);
      const data = await response.json();
      setRecipes(data);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching searched recipes:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
    window.location.reload()
  };

  return (
    <>
<div className="cont">
<nav className="navbar">
  <div className="logo">
    <span>NutriGo</span>
    <img className="leaf-img" src="/images/leaf6.png" alt="Logo" />
  </div>

  <div className="nav-search-container">
    <input
      type="text"
      className="nav-search-bar"
      placeholder="Search by ingredients.."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{marginTop:"12px",width:"50%"}}
    />
    <button className="button-search" onClick={fetchRecipesByIngredients}
     style={{marginTop:"12px"}}
    >
      Search
    </button>

    <img src='/images/userHome2.png'/>
   
    <Link  style={{textDecoration:"none",color:"#53e726",paddingTop:"19px",paddingLeft:"5px",marginRight: "40px"}} onClick={toggleDropdown} ><h3>Hello,{username}</h3></Link>
    
    {showDropdown && (
      <div className='dropdown'>
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
      </div>
    
    )}
  </div>
  
</nav>

        <section className="hero">
          <div className="hero-text">
            <h1>Welcome to NutriGo</h1>
            <p>Fuel your day with a personalized meal plan!</p>
          </div>
        </section>

        <div className='meal-container'>
        <section className="meal-plan">
          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            recipes.length > 0 ? (
              recipes.map(recipe => (
                <div className="meal-card" key={recipe._id}>
                  <Link to={`/foodDescription/${recipe.id}`} style={{ textDecoration: "none" }}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="meal-info">
                      <h4>{recipe.title}</h4>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No recipes found. Try searching with different ingredients.</p>
            )
          )}
        </section>
        </div>

        <div className="customize-meal-container">
      {flag !== 'true' && (
        <Link to="/mealplan" className="customize-meal-button" style={{textDecoration:"none"}}>
          Customize Your Meal Plan
        </Link>
      )}
    </div>

        <div className="button-container">
          <button
            type="button"
            className="feedback-button"
            onClick={() => {
              window.location.href = '/feedback';
            }}
          >
            feedback
          </button>
          <button
            type="button"
            className="report-button"
            onClick={() => {
              window.location.href = '/report';
            }}
          >
            report
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
