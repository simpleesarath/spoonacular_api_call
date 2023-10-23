import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [recipe, setRecipe] = useState();


  // Link to Spoonacular API
  async function getRandomRecipe() {
    try {
      //Here is my API key 
      const apiKey = 'de6103d8dac64252a3ec8bd0c5ffacb9';

      //making spoonacular api call to get a random recipe
      let resp = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
      console.log(21, resp.data);

      //store the random recipe into the recipe variable
      setRecipe(resp.data.recipes[0]);
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    getRandomRecipe();
  }, []);



  return (

    <div className="row">

      <button onClick={getRandomRecipe}>
        Generate Random Recipie
      </button>


      <div>
        Name:
        <a target="_blank" href={recipe?.sourceUrl}>
          {recipe?.title}
        </a>
      </div>
      <img src={recipe?.image} />

      <div className="ingredients">
        <div>
          <h2><u>Ingredients needed:</u></h2>
        </div>
        {recipe?.extendedIngredients.map((ingredient, index) =>
          <span key={index}>

            {index != recipe?.extendedIngredients.length - 1 ? ingredient.name + ", " : ingredient.name}
          </span>
        )}
        <div>
          <h3><u>Process to make this dish</u></h3>
        </div>
        {recipe?.analyzedInstructions.map((instruction) =>
          <ol>
            {instruction.steps?.map((step) =>
              <li>
                {step.step}
              </li>
            )}
          </ol>
        )
        }
      </div >
      <div>

      </div>

    </div >

  );
}

export default App;