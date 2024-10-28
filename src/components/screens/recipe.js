import React, { useState } from 'react';
import './recipe.css'; 

const Recipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [duration, setDuration] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [nutritiousFacts, setNutritiousFacts] = useState('');
  const [preparation, setPreparation] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipeData = {
      recipeName,
      duration,
      ingredients,
      nutritiousFacts,
      preparation,
    };

    console.log('Submitted Recipe Data:', recipeData);
    
    setFormSubmitted(true);
  };

  const handleNewForm = () => {
    setRecipeName('');
    setDuration('');
    setIngredients('');
    setNutritiousFacts('');
    setPreparation('');
    setFormSubmitted(false);
  };

  return (
    <div className="recipe-form-container">
      {!formSubmitted ? (
        <form onSubmit={handleSubmit} className="recipe-form">
          <h2 className="recipe-form-title">Add Recipe</h2>

          <div className="form-group">
            <label htmlFor="recipeName" className="form-label">Recipe Name:</label>
            <input 
              type="text" 
              id="recipeName" 
              name="recipeName" 
              className="form-input" 
              value={recipeName} 
              onChange={(e) => setRecipeName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration" className="form-label">Duration (minutes):</label>
            <input 
              type="number" 
              id="duration" 
              name="duration" 
              className="form-input" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients" className="form-label">Ingredients:</label>
            <textarea 
              id="ingredients" 
              name="ingredients" 
              className="form-textarea" 
              value={ingredients} 
              onChange={(e) => setIngredients(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="nutritiousFacts" className="form-label">Nutritious Facts:</label>
            <textarea 
              id="nutritiousFacts" 
              name="nutritiousFacts" 
              className="form-textarea" 
              value={nutritiousFacts} 
              onChange={(e) => setNutritiousFacts(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="preparation" className="form-label">How to Prepare:</label>
            <textarea 
              id="preparation" 
              name="preparation" 
              className="form-textarea" 
              value={preparation} 
              onChange={(e) => setPreparation(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="form-submit-btn">Submit</button>
        </form>
      ) : (
        <div className="form-submitted-container">
          <h2 className="form-submitted-title">Form Submitted!</h2>
          <p className="form-submitted-message">The recipe has been sent for verification.</p>
          <button onClick={handleNewForm} className="form-submit-new-btn">Add Another Recipe</button>
        </div>
      )}
    </div>
  );
};

export default Recipe;
