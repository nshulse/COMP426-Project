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

const goToSavedPage = () => {
  window.location.href = 'saved.html';
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

const savedRecipesButton = document.createElement('button');
savedRecipesButton.textContent = 'My Saved Recipes';
savedRecipesButton.addEventListener('click', goToSavedPage);
featuredRecipesElement.appendChild(savedRecipesButton);


const userRecipesListElement = document.getElementById('user-recipes-list');
  fetch('/user_recipes')
  .then(response => response.json())
  .then(data => {
      data.forEach(recipe => {
          console.log(recipe.ingredients)
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('recipe');
          recipeElement.classList.add('user-recipe')
          
          let ingredients_text = []
          let parsed = JSON.parse(recipe.ingredients)

          parsed.forEach(ingredient => {
              let name = ingredient.name
              let portion = ingredient.portion
              let unit = ingredient.unit
              ingredients_text.push(' ' + portion + ' ' + unit + ' of ' + name + ' ')
          });
          console.log(parsed)

          recipeElement.innerHTML = `
              <h2 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">${recipe.title}</h2>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Summary:</strong> ${recipe.summary}</p>
              <img src="${recipe.imageUrl}" alt="${recipe.title}" width = "300" />
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Description:</strong> ${recipe.description}</p>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Ingredients:</strong> ${ingredients_text}</p>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Instructions:</strong> ${recipe.instructions}</p>
          `;
          userRecipesListElement.appendChild(recipeElement);
      });
  })
  .catch(error => {
      console.error('Error fetching user recipes:', error);
  });
