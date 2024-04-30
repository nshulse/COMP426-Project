const features = document.getElementById('user-featured');

fetch('/user_recipes')
    .then(response => response.json())
    .then(data => {
        data.forEach(recipe => {
            console.log(recipe.ingredients)
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.classList.add('my-recipe')
            
            let ingredients_text = []
            let parsed = JSON.parse(recipe.ingredients)

            parsed.forEach(ingredient => {
                let name = ingredient.name
                let portion = ingredient.portion
                let unit = ingredient.unit
                ingredients_text.push(' ' + portion + ' ' + unit + ' of ' + name + ' ')
            });
            console.log(parsed);

            recipeElement.innerHTML = `
                <h2 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">${recipe.title}</h2>
                <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Summary:</strong> ${recipe.summary}</p>
                <img src="${recipe.imageUrl}" alt="${recipe.title}" width = "300" />
                <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Description:</strong> ${recipe.description}</p>
                <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Ingredients:</strong> ${ingredients_text}</p>
                <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Instructions:</strong> ${recipe.instructions}</p>
            `;

            let buttons = document.createElement('div')

            buttons.style = 'display: flex; justify-content: center';

            let save = document.createElement('button')
            save.innerText = 'Save Recipe';
            save.data = recipe;

            console.log(recipe.id)


            save.addEventListener('click', () => {
                if(save.innerText == 'Save Recipe'){
                    //TODO: Save recipe
                    console.log("saving")
                    fetch('/save_recipe', {method: "post", body: JSON.stringify({"recipe_id": recipe.id})})
                    .then(response => {
                        if(response.ok) {
                            console.log("save worked")
                        }
                    })
                    save.innerText = 'Unsave Recipe';
                } else {
                    //TODO: unsave recipe
                    save.innerText = 'Save Recipe';
                }
            });

            buttons.appendChild(save);

            recipeElement.appendChild(buttons);

            features.appendChild(recipeElement);
        });
    })
    .catch(error => {
        console.error('Error fetching user recipes:', error);
    });