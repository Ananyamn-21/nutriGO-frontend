
import React, { useState, useEffect } from 'react';
import "./adminhome.css";
import { Link ,useNavigate} from 'react-router-dom';

const AdminHomePage = () => {
  const [userCount, setUserCount] = useState(0);
  const [recipeCount, setRecipeCount] = useState(0);
  const [newRecipeRequests, setNewRecipeRequests] = useState([]);
  const [foodOrderCount, setFoodOrderCount] = useState(0);
  const [foodOrders, setFoodOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/food/new_orders?limit=3");
        const data = await response.json();
        setFoodOrders(data.orders); 
      } catch (error) {
        console.error('Error fetching new food orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/food/users/count') 
      .then((response) => response.json())
      .then((data) => setUserCount(data.count))
      .catch((error) => console.error('Error fetching user count:', error));

    fetch('http://localhost:8080/food/recipe/count') 
      .then((response) => response.json())
      .then((data) => setRecipeCount(data.count))
      .catch((error) => console.error('Error fetching recipe count:', error));

    fetch('http://localhost:8080/food/recipe/new_requests?limit=3') 
      .then((response) => response.json())
      .then((data) => setNewRecipeRequests(data.requests))  
      .catch((error) => console.error('Error fetching new recipe requests:', error));

    fetch('http://localhost:8080/food/orders/count') 
      .then((response) => response.json())
      .then((data) => setFoodOrderCount(data.count))
      .catch((error) => console.error('Error fetching food order count:', error));
  }, []);

  return (
    <div className="admin-home-page">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div className="stat-item">
          <h2>Total Users</h2>
          <p>{userCount}</p>
        </div>
        <div className="stat-item">
          <h2>Total Recipes</h2>
          <p>{recipeCount}</p>
        </div>
        <div className="stat-item">
          <h2>New Recipe Requests</h2>
          <p>{newRecipeRequests.length}</p>
        </div>
        <div className="stat-item">
          <h2>Total Food Orders</h2>
          <p>{foodOrderCount}</p>
        </div>
      </div>

      <div className='newOrders'>
        <h2>New Food Orders</h2>
        <div className="meal-card1">
          {foodOrders.map((order) => (
            <div key={order._id} className='rec'>
              <Link style={{ textDecoration: "none" }}>
                <img src={order.orders[0].foodItem.image} alt={order.orders[0].foodItem.image} />
                <div className="meal-info">
                  <h6>{order.orders[0].foodItem.itemName}</h6>
                 
                  <h6>Total Price: {order.priceSummary}</h6>
                </div>
              </Link>
            </div>
          ))}
          <div className='rec' style={{ paddingTop: "9%" }}>
            <h6 style={{ color: "black" }}>Manage on Food Orders Tab</h6>
          </div>
        </div>
      </div>

      <div className='newReq' style={{ paddingTop: "8%" }}>
  <h2>New Recipe Requests</h2>
  <div className='meal-card1'>
    {newRecipeRequests.length > 0 ? (
      newRecipeRequests.map((recipe, index) => (
        <div key={index} className='rec'>
          <Link style={{ textDecoration: "none" }}>
            <img src="https://img.spoonacular.com/recipes/635233-556x370.jpg" alt={recipe.recipeName} />
            <div className="meal-info">
              <h6>{recipe.recipeName}</h6>
              <p>{recipe.description}</p>
            </div>
          </Link>
        </div>
      ))
    ) : (
      <div className='rec'>
        <h6 style={{ color: "black" }}>There is no new recipe requests found.....!</h6>
      </div>
    )}
    {newRecipeRequests.length > 0 && (
      <div className='rec' style={{ paddingTop: "9%" }}>
        <h6 style={{ color: "black" }}>Manage on New Recipes Tab</h6>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default AdminHomePage;
