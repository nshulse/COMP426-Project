    const savedRecipesElement = document.getElementById('saved-recipes');
  
    fetch('/saved_recipes')
      .then(response => response.json())
      .then(data => {
        data.recipes.forEach(recipe => {
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('recipe');
          recipeElement.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <p>${recipe.summary}</p>
          `;
          savedRecipesElement.appendChild(recipeElement);
        });
      })
      .catch(error => {
        console.error('Error fetching saved recipes:', error);
      });
  