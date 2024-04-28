const myRecipesListElement = document.getElementById('my-recipes-list');

fetch('/my_recipes')
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
            myRecipesListElement.appendChild(recipeElement);
        });
    })
    .catch(error => {
        console.error('Error fetching user recipes:', error);
    });