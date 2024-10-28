
import React, { useEffect, useState } from "react";
import "./mealplans.css";

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fetchMealPlans = async () => {
      try {
        const response = await fetch("http://localhost:8080/food/getAllMealplans"); 
        const data = await response.json();
        setMealPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
        setLoading(false);
      } 
    };

    fetchMealPlans();
  }, []);

  const renderMeals = (meals) => {
    return meals.map((meal) => (
      <li key={meal.id}>
        {meal.title} (Ready in {meal.readyInMinutes} minutes, Servings: {meal.servings})
      </li>
    ));
  };

  const renderUserMealPlans = (userMealPlans) => {
    return Object.keys(userMealPlans.week).map((day) => (
      <tr key={day}>
        <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
        <td>
          <ul>{renderMeals(userMealPlans.week[day].meals)}</ul>
        </td>
        <td>
          {userMealPlans.week[day].nutrients.calories} kcal /{" "}
          {userMealPlans.week[day].nutrients.protein}g protein /{" "}
          {userMealPlans.week[day].nutrients.fat}g fat /{" "}
          {userMealPlans.week[day].nutrients.carbohydrates}g carbs
        </td>
      </tr>
    ));
  };

  return (
    <div class="main1">
      <h2>Manage Meal Plans (User-wise)</h2>
      <p>available meal plans by user</p>

      <div className="meal-plan-crd">
        {loading ? (
          <p>Loading meal plans...</p>
        ) : mealPlans.length > 0 ? (
          mealPlans.map((userMealPlan) => (
            <div key={userMealPlan.userId}>
              <h3>User ID: {userMealPlan.userId}</h3>
              <table className="table">
                <thead className="thead-dark">
                  <tr className="meal-plan-header">
                    <th scope="col">Day</th>
                    <th scope="col">Meals</th>
                    <th scope="col">Nutrients (Calories / Protein / Fat / Carbohydrates)</th>
                  </tr>
                </thead>
                <tbody>
                  {renderUserMealPlans(userMealPlan)}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No meal plans found.</p>
        )}
      </div>
    </div>
  );
};

export default MealPlans;

