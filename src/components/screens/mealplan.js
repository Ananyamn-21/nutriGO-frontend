
import React, { useState } from 'react';
import './mealplan.css';
import Navbar from '../navbar/Navbar'

const CustomizeMealPlan = () => {
  const [formData, setFormData] = useState({
    goal: '',
    gender: '',
    allergy: '',
    foodPreference: '',
    height: '',
    weight: '',
    age:''
  });
  const [errors, setErrors] = useState({});

  const userId = localStorage.getItem('userId'); 

  console.log("userid",userId)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.weight) {
      newErrors.weight = "Weight is required.";
    } else if (formData.weight < 30 || formData.weight > 9999) {
      newErrors.weight = "Weight must be at least 30 and cannot exceed 4 digits.";
    }

    if (!formData.height) {
      newErrors.height = "Height is required.";
    } else if (formData.height > 213.36) {
      newErrors.height = "Height cannot exceed 213.36 cm.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    const updateUserInfoBody = {
      userId,
      age: formData.age,
      gender: formData.gender,
      currentWeight: Number(formData.weight),
      height: Number(formData.height),
      goal: formData.goal === 'weightGain' ? 'weight_gain' : 'weight_loss',
      vegOnly: formData.foodPreference === 'veg',
      allergy: formData.allergy ? formData.allergy.split(',').map(a => a.trim()) : [], 
    };

    try {
     
      const userInfoResponse = await fetch('http://localhost:8080/food/mealplan/addUserInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUserInfoBody),
      });

      if (userInfoResponse.ok) {
        console.log('User info updated successfully');

        const mealPlanResponse = await fetch('http://localhost:8080/food/mealplan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            timeFrame: 'week', 
          }),
        });

        if (mealPlanResponse.ok) {
          const mealPlanData = await mealPlanResponse.json();
          console.log('Meal Plan created successfully:', mealPlanData);
      
          const userId = mealPlanData.userId || localStorage.getItem('userId');
      
          if (userId) {
              console.log("User ID for meal plan:", userId);
              window.alert("Meal plan has been created");
              
              window.location.href = '/daily';
          } else {
              console.error('User ID is undefined. Cannot redirect.');
          }
      } else {
          console.error('Failed to create meal plan:', mealPlanResponse.statusText);
      }
      
      } else {
        console.error('Failed to update user info:', userInfoResponse.statusText);
      }
    } catch (error) {
      console.error('Error during API call: ', error);
    }


    setFormData({
      goal: '',
      gender: '',
      allergy: '',
      foodPreference: '',
      height: '',
      weight: '',
      age:''
    });
    setErrors({});
  };

  return (
    <>
    <Navbar/>
    <div className="conti">
      <h2>Customize Your Meal Plan</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Goal:
          <select name="goal" value={formData.goal} onChange={handleChange} className="select">
            <option value="">Select your goal</option>
            <option value="weightGain">Weight Gain</option>
            <option value="weightLoss">Weight Loss</option>
          </select>
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} className="select">
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Food Allergy:
          <input
            type="text"
            name="allergy"
            value={formData.allergy}
            onChange={handleChange}
            placeholder="Enter your allergies (comma-separated)"
            className="input"
          />
        </label>
        <label>
          Food Preference:
          <div>
            <label>
              <input
                type="radio"
                name="foodPreference"
                value="veg"
                checked={formData.foodPreference === 'veg'}
                onChange={handleChange}
              /> Veg
            </label>
            <label>
              <input
                type="radio"
                name="foodPreference"
                value="nonVeg"
                checked={formData.foodPreference === 'nonVeg'}
                onChange={handleChange}
              /> Non-Veg
            </label>
          </div>
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Enter your height"
            className="input"
          />
          {errors.height && <span className="error">{errors.height}</span>}
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter your weight"
            className="input"
          />
           age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="input"
          />
          {errors.weight && <span className="error">{errors.weight}</span>}
        </label>
        <button type="submit" className="submitButton">Submit</button>
      </form>
    </div>
    </>
  );
};

export default CustomizeMealPlan;
