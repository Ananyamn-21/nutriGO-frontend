import React, { useState } from 'react';
import "./admin.css";
import Users from '../admin/userlist/Userlist';
import ManageRecipe from '../admin/managerecipe/managerecipe';
import MealPlans from '../admin/mealplans/mealplans';
import Food1 from '../admin/foodorder/foodorder';
import Feedbacks from '../admin/feedback/feedback';
import Reports from '../admin/reports/reports';
import NewRecipes from '../admin/newrecipe/newrecipes';
import AdminHomePage from '../admin/home/adminhome';
import Navbar from '../admin/adminNav/AdminNavbar';
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const navigate = useNavigate()

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); 
  };

  const handleLogout = ()=>{
    localStorage.clear()
    navigate('/adminlogin', { replace: true })
  }
  
  return (
  
     
    <div className="admin-dashboard">
    
      <div className="sidebar">
      <Navbar/>
        <ul>
          <li onClick={() => handleMenuClick('adminhomepage')}>Homepage</li>
          <li onClick={() => handleMenuClick('users')}>Manage Users</li>
          <li onClick={() => handleMenuClick('recipes')}>Manage Recipes</li>
          <li onClick={() => handleMenuClick('mealPlans')}>Meal Plans</li>
          <li onClick={() => handleMenuClick('food1')}>Food Orders</li>
          <li onClick={() => handleMenuClick('reports')}>Reports</li>
          <li onClick={() => handleMenuClick('feedbacks')}>Feedbacks</li>
          <li onClick={() => handleMenuClick('newRecipes')}>New Recipes</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="content">
      
        {selectedMenu === 'dashboard' && 
      
        <div class="div1">
         <AdminHomePage/>
        </div>
       
        }

        {selectedMenu === 'adminhomepage' && <AdminHomePage/>}
        {selectedMenu === 'users' && <Users />}
        {selectedMenu === 'recipes' && <ManageRecipe />}
        {selectedMenu === 'mealPlans' && <MealPlans />}
        {selectedMenu === 'food1' && <Food1 />}
        {selectedMenu === 'reports' && <Reports />}
        {selectedMenu === 'feedbacks' && <Feedbacks />}
        {selectedMenu === 'newRecipes' && <NewRecipes />}
      </div>
    </div>
    
 
  );
};



export default Admin;