
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './customhome.css'; 
import Navbar from '../navbar/Navbar'

const DailyMealOverview = () => {
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(null);
  const userId = localStorage.getItem('userId'); 
  const navigate = useNavigate()
  useEffect(() => {
  
    const fetchMealPlan = async () => {

      try {
        
        const response = await fetch(`http://localhost:8080/food/mealplan/${userId}`);
        const data = await response.json();
        
        if(response.status === 404){
          navigate('/mealplan')
         window.alert("you dont have any meal plan !! Please click here to customize your meal...") 
          
        }
        
        setWeeklyMealPlan(data.week);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };

    fetchMealPlan();
  }, [userId]);

  if (!weeklyMealPlan) {
    console.log(weeklyMealPlan,"weekly meal plan")
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="tab">
      <h1>Weekly Meal Plan</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Meals</th>
            <th>Calories</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Carbohydrates (g)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(weeklyMealPlan).map((day) => (
            <tr key={day}>
              <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
              <td>
                {weeklyMealPlan[day].meals.map((meal) => (
                  <div key={meal.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); 
                        window.location.href = `/foodDescription/${meal.id}`; 
                      }}
                    >
                      {meal.title}
                    </a>
                  </div>
                ))}
              </td>
              <td>{weeklyMealPlan[day].nutrients.calories}</td>
              <td>{weeklyMealPlan[day].nutrients.protein}</td>
              <td>{weeklyMealPlan[day].nutrients.fat}</td>
              <td>{weeklyMealPlan[day].nutrients.carbohydrates}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>{navigate('/')}}>Back to home </button> 
      
    </div>
    </>
  );
};

export default DailyMealOverview;
