import React, { useState } from 'react';
import './profile.css';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    photo: 'https://via.placeholder.com/150', 
    name: 'John Doe',
    email: 'johndoe@example.com',
    mealPlan: {
      goal: '',
      gender: '',
      allergy: '',
      foodPreference: ''
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({
        ...profileData,
        photo: URL.createObjectURL(file)
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleMealPlanChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      mealPlan: {
        ...profileData.mealPlan,
        [name]: value
      }
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">

      <div className="profile-header">
        <div className='profilepic'>
        <img src={profileData.photo} alt="Profile" className="profile-photo" />
        {isEditing && <input type="file" onChange={handlePhotoChange} />}
        <div className="remove-photo">
          {isEditing && <button className="remove-photo-btn">Remove</button>}
        </div>
        </div>
       
      </div>

      <div className="profile-details">
        {isEditing ? (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </label>

            <h3>Meal Plan Information</h3>

            <label>
              Goal:
              <select
                name="goal"
                value={profileData.mealPlan.goal}
                onChange={handleMealPlanChange}
              >
                <option value="">Select your goal</option>
                <option value="weightGain">Weight Gain</option>
                <option value="weightLoss">Weight Loss</option>
              </select>
            </label>

            <label>
              Gender:
              <select
                name="gender"
                value={profileData.mealPlan.gender}
                onChange={handleMealPlanChange}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </label>

            <label>
              Food Allergy:
              <input
                type="text"
                name="allergy"
                value={profileData.mealPlan.allergy}
                onChange={handleMealPlanChange}
                placeholder="Enter your allergies (if any)"
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
                    checked={profileData.mealPlan.foodPreference === 'veg'}
                    onChange={handleMealPlanChange}
                  /> Veg
                </label>
                <label>
                  <input
                    type="radio"
                    name="foodPreference"
                    value="nonVeg"
                    checked={profileData.mealPlan.foodPreference === 'nonVeg'}
                    onChange={handleMealPlanChange}
                  /> Non-Veg
                </label>
              </div>
            </label>
          </>
        ) : (
          <>
            <h2>{profileData.name}</h2>
            <p>Email: {profileData.email}</p>

            <h3>Meal Plan Information</h3>
            <p>Goal: {profileData.mealPlan.goal}</p>
            <p>Gender: {profileData.mealPlan.gender}</p>
            <p>Food Allergy: {profileData.mealPlan.allergy}</p>
            <p>Food Preference: {profileData.mealPlan.foodPreference}</p>
          </>
        )}
      </div>

      <button onClick={toggleEdit} className="edit-button">
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default UserProfile;
