import React, { useState } from "react";

const NewRecipes = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      username: "fitchef",
      name: "Quinoa Salad",
      duration: "20 minutes",
      preparationSteps: "1. Cook quinoa, 2. Chop veggies, 3. Mix with dressing",
      nutifacts: "250 kcal, 8g protein, 40g carbs, 7g fat",
    },
    {
      id: 2,
      username: "healthyguru",
      name: "Grilled Chicken Breast",
      duration: "30 minutes",
      preparationSteps: "1. Season chicken, 2. Grill for 20 min, 3. Serve with veggies",
      nutifacts: "300 kcal, 40g protein, 5g carbs, 10g fat",
    },
    {
      id: 3,
      username: "cleaneats",
      name: "Avocado Toast",
      duration: "10 minutes",
      preparationSteps: "1. Toast bread, 2. Mash avocado, 3. Spread on toast, 4. Add toppings",
      nutifacts: "200 kcal, 6g protein, 20g carbs, 12g fat",
    },
  ]);

  const acceptRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const rejectRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const markPending = (id) => {
    // Optionally handle marking as pending
    alert(`Recipe with ID: ${id} marked as pending.`);
  };

  const viewMore = (recipe) => {
    alert(
      `Recipe Details:\n\nName: ${recipe.name}\nDuration: ${recipe.duration}\nPreparation: ${recipe.preparationSteps}\nNutrition Facts: ${recipe.nutifacts}`
    );
  };

  return (
    <div className="container">
      <h2>New Diet Recipes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Username</th>
            <th>Recipe Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length === 0 ? (
            <tr>
              <td colSpan="4">No new recipes available</td>
            </tr>
          ) : (
            recipes.map((recipe, index) => (
              <tr key={recipe.id}>
                <td>{index + 1}</td>
                <td>{recipe.username}</td>
                <td>
                  {recipe.name}{" "}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => viewMore(recipe)}
                  >
                    View More
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => acceptRecipe(recipe.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => markPending(recipe.id)}
                  >
                    Pending
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => rejectRecipe(recipe.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewRecipes;
