import React, { useState, useEffect } from "react";
import "./managerecipe.css"; 

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8080/food/getAllRecipes"); 
        const data = await response.json();
    
        const transformedRecipes = data.map(recipe => ({
          id: recipe.id, 
          name: recipe.title,
          duration: `${recipe.readyInMinutes} minutes`,
          ingredients: recipe.diets.length > 0 ? recipe.diets : ["No special diet"],
          nutritiousFacts: `Calories: ${recipe.description.match(/(\d+) calories/)[1]}, Protein: ${recipe.description.match(/(\d+)g of protein/)[1]}g`,
          preparationSteps: recipe.instructions,
        }));
        setRecipes(transformedRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleUpdate = (id) => {
    // Logic for updating the recipe can be implemented here
    console.log(`Update recipe with ID: ${id}`);
  };

  return (
    <div className="main1">
      <h2>Manage Recipes</h2>
     
  
      <div className="recipe-crd">
        <table className="table">
          <thead className="thead-dark">
            <tr className="recipe-header">
              <th scope="col">Recipe ID</th>
              <th scope="col">Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Ingredients</th>
              <th scope="col">Nutritious Facts</th>
              <th scope="col">Preparation Steps</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading recipes...</td>
              </tr>
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>{recipe.duration}</td>
                  <td>{recipe.ingredients.join(", ")}</td>
                  <td>{recipe.nutritiousFacts}</td>
                  <td>{recipe.preparationSteps}</td>
                  <td>
                    <button onClick={() => handleUpdate(recipe.id)}>Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No recipes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}  

export default ManageRecipes;
