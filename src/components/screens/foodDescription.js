
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './oatmeal.css';
import { Link,useNavigate } from "react-router-dom"; 
import Navbar from '../navbar/Navbar'

function FoodDesc() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {

    const fetchRecipeById = async () => {
      try {
        const response = await fetch(`http://localhost:8080/food/recipes/getInfo/${id}`); 
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipeById();
  }, [id]);

  if (loading) {
    return <p>Loading recipe...</p>;
  }

  return (
    <>
     <Navbar/>
    <div className="contains">
     
      <div className="container1">
        <h1>{recipe.title}</h1>

        <img src={recipe.image} alt={recipe.title} className="recipe-image" />

        <h2>How to Prepare</h2>
        <p>{recipe.instructions}</p>

        <h2>Ingredients:</h2>
        <ul>
          {recipe.analyzedInstructions[0]?.steps.flatMap(step =>
            step.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))
          )}
        </ul>

        <h2>Directions:</h2>
        <ol>
          {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
            <li key={index}>{step.step}</li>
          ))}
        </ol>

        <div className="nutritional-facts">
          <h3>Nutritional Info (Per Serving)</h3>
          <p><strong>Calories:</strong> {recipe.description.match(/512 calories/)}</p>
          <p><strong>Protein:</strong> {recipe.description.match(/7g of protein/)}</p>
          <p><strong>Carbohydrates:</strong> N/A </p>
          <p><strong>Fat:</strong> {recipe.description.match(/23g of fat/)}</p>
        </div>

        <div className="order-button">
          <Link
            to={{
              pathname: "/foodorder",
            }}
            state={{
              recipeId: id, 
              recipeName: recipe.title,
              price:recipe.pricePerServing 
            }}
          >
            <button>Order Now</button>
          </Link>
        </div>

        <div className="add-recipe-button">
          <a href="/recipe">
            <button>Add Recipe</button>
          </a>
        </div>
        <button onClick={()=>navigate('/')}>Back to home</button>
      </div>
    </div>
    </>
  );
}

export default FoodDesc;
