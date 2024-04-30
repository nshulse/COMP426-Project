const myRecipesListElement = document.getElementById('my-recipes-list');

fetch('/my_recipes')
    .then(response => response.json())
    .then(data => {
        data.recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.classList.add('my-recipe')
            let ing_text = [];
            for(const ing of recipe.ingredients){
                ing_text.push(ing.portion + ' ' + ing.unit + ' of ' + ing.name);
            }
            ing_text = ing_text.join("; ");
            recipeElement.innerHTML = `
                <h2>${recipe.title}</h2>
                <p><strong>Summary:</strong> ${recipe.summary}</p>
                <img src="${recipe.imageUrl}" alt="${recipe.title}" width = "300" />
                <p><strong>Description:</strong> ${recipe.description}</p>
                <p><strong>Ingredients:</strong> ${ing_text}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;
            myRecipesListElement.appendChild(recipeElement);
        });
    })
    .catch(error => {
        console.error('Error fetching user recipes:', error);
    });