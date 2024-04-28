const featuredRecipesElement = document.getElementById('featured_list');
const userRecipesElement = document.getElementById('user-recipes-list');

const saveRecipe = (recipeId) => {
  fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=244f92f2232c4a6f9a98fa49e12d3ba0`)
    .then(response => response.json())
    .then(recipe => {
      fetch('/save_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recipe })
      })
      .then(response => {
        if (response.ok) {
          console.log('Recipe saved successfully');
        } else {
          console.error('Failed to save recipe');
        }
      })
      .catch(error => {
        console.error('Error saving recipe:', error);
      });
    })
    .catch(error => {
      console.error('Error fetching recipe details:', error);
    });
};

fetch('https://api.spoonacular.com/recipes/random?number=10&apiKey=244f92f2232c4a6f9a98fa49e12d3ba0')
  .then(response => response.json())
  .then(data => {
    data.recipes.forEach(recipe => {
      const recipeElement = document.createElement('div');
      recipeElement.classList.add('recipe');
      recipeElement.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p>${recipe.summary}</p>
        <button onclick="saveRecipe('${recipe.id}')">Save</button>
      `;
      recipeElement.appendChild(recipeElement.querySelector('button'));
      featuredRecipesElement.appendChild(recipeElement);
    });
  })
  .catch(error => {
    console.error('Unexpected fetch error occurred: ', error);
  });

fetch('/user_recipes') // Assuming this endpoint returns user-added recipes
    .then(response => response.json())
    .then(data => {
        data.recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h2>${recipe.title}</h2>
                <p>${recipe.summary}</p>
                <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                <p>${recipe.description}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;
            userRecipesElement.appendChild(recipeElement);
        });
    })
    .catch(error => {
        console.error('Error fetching user recipes:', error);
    });
