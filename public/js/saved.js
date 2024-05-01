const savedRecipesElement = document.getElementById('saved-recipes');

fetch('/saved_recipes')
.then(response => response.json())
  .then(data => {
    console.log(data);
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

          let macros_text = {'Calories': 0, 'Total Fat (g)': 0, 'Saturated Fats (g)': 0, 'Protein (g)': 0, 
                                'Sodium (mg)': 0, 'Potassium (mg)': 0, 'Cholestorol (mg)': 0, 'Carbohydrates (g)': 0,
                                'Fiber (g)': 0, 'Sugar (g)': 0};
            let parsed_macros = JSON.parse(recipe.nutrition);
            parsed_macros.forEach(food => {
                macros_text['Calories'] += food.calories;
                macros_text['Total Fat (g)'] += food.fat_total_g;
                macros_text['Saturated Fats (g)'] += food.fat_saturated_g;
                macros_text['Protein (g)'] += food.protein_g;
                macros_text['Sodium (mg)'] += food.sodium_mg;
                macros_text['Potassium (mg)'] += food.potassium_mg;
                macros_text['Cholestorol (mg)'] += food.cholesterol_mg;
                macros_text['Carbohydrates (g)'] += food.carbohydrates_total_g;
                macros_text['Fiber (g)'] += food.fiber_g;
                macros_text['Sugar (g)'] += food.sugar_g;
            })

            let nutritionText = [];
            Object.keys(macros_text).forEach(key => {
                nutritionText.push(key + ': ' + macros_text[key]);
            })
            nutritionText = nutritionText.join("; ");

          recipeElement.innerHTML = `
              <h2 style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">${recipe.title}</h2>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Author:</strong> ${recipe.authorName}</p>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Summary:</strong> ${recipe.summary}</p>
              <img src="${recipe.imageUrl}" alt="${recipe.title}" width = "300" />
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Description:</strong> ${recipe.description}</p>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Ingredients:</strong> ${ingredients_text}</p>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Instructions:</strong> ${recipe.instructions}</p>
              <p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"><strong>Nutritional Info:</strong> ${nutritionText}</p>
          `;

          let buttons = document.createElement('div')

          buttons.style = 'display: flex; justify-content: center';

          let save = document.createElement('button')
          save.innerText = 'Unsave Recipe';
          save.data = recipe;

          save.addEventListener('click', () => {
              if(save.innerText == 'Save Recipe'){
                  save.innerText = 'Unsave Recipe';
              } else {
                  save.innerText = 'Save Recipe';
              }
          });

          buttons.appendChild(save);

          recipeElement.appendChild(buttons);

          savedRecipesElement.appendChild(recipeElement);
      });
  })
  .catch(error => {
      console.error('Error fetching user recipes:', error);
  });