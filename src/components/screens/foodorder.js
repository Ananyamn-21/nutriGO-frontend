import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import Navbar from '../navbar/Navbar'
import "./foodorder.css";

function FoodOrder() {
  const location = useLocation();
  const { recipeId, recipeName,price } = location.state || {};

  const userId = localStorage.getItem("userId");
  
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

  const foodItems = [
    { id: recipeId, name: recipeName, price: price },
  ];

  const handleCheckboxChange = (event, food) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }]);
    } else {
      setSelectedFoods(selectedFoods.filter((item) => item.id !== food.id));
    }
  };

  const handleQuantityChange = (event, foodId) => {
    const quantity = parseInt(event.target.value);
    setSelectedFoods(
      selectedFoods.map((item) =>
        item.id === foodId ? { ...item, quantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return selectedFoods.reduce(
      (total, food) => Math.round(total + food.price * food.quantity),
      0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFoods.length > 0) {
      const orderPayload = {
        userId: userId,  
        items: selectedFoods.map((food) => ({
          itemId: food.id,
          quantity: food.quantity
        }))
      };

      try {
        const response = await fetch("http://localhost:8080/food/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Order successful:", responseData);
          setSubmitted(true);
          alert("Order has been sent to the admin.");
        } else {
          console.error("Order failed:", response.status);
          alert("Failed to place the order.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred while placing the order.");
      }
    } else {
      alert("Please select at least one food item.");
    }
  };

  return (
  <div className="main">
  <Navbar/>
    <div className="food-container">
      
      <div className="background-image">
        <div className="content-panel">
          {!submitted && (
            <>
              
              <h2 className="meal-time">Order recipe: {recipeName}</h2>
              <form onSubmit={handleSubmit}>
                {foodItems.map((food) => (
                  <div key={food.id} className="food-item">
                    <input
                      type="checkbox"
                      value={food.name}
                      onChange={(e) => handleCheckboxChange(e, food)}
                    />
                    <label className="food-label">
                      {food.name} - ₹{food.price}
                    </label>
                    {selectedFoods.some((item) => item.id === food.id) && (
                      <label style={{ marginLeft: "10px" }}>
                        Quantity:{" "}
                        <input
                          type="number"
                          value={
                            selectedFoods.find((item) => item.id === food.id)
                              ?.quantity || 1
                          }
                          onChange={(e) => handleQuantityChange(e, food.id)}
                          min="1"
                        />
                      </label>
                    )}
                  </div>
                ))}
                <h4>Total: ₹{calculateTotal()}</h4>
                <button type="submit">Submit Order</button>
              </form>
            </>
          )}

          {submitted && (
            <div>
              <h3>Order Summary</h3>
              <ul>
                {selectedFoods.map((food, index) => (
                  <li key={index}>
                    {food.name} - ₹{food.price} x {food.quantity} = ₹
                    {food.price * food.quantity}
                  </li>

                ))}
              </ul>
              <h4>Grand Total: ₹{calculateTotal()}</h4>
              <button onClick={()=>{navigate('/daily')}}>Back to my meal plan</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>

  );
}

export default FoodOrder;
