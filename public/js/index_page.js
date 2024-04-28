const featuredRecipesElement = document.getElementById('featured_list');

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