const addIngredientButton = document.getElementById('add-ingredient');
const ingredientsContainer = document.getElementById('ingredients-container');

addIngredientButton.addEventListener('click', () => {
    const ingredientField = document.createElement('div');
    ingredientField.innerHTML = `
        <input type="text" name="ingredientName" placeholder="Ingredient Name" required>
        <input type="number" name="ingredientPortion" placeholder="Portion">
        <input type="text" name="ingredientUnit" placeholder="Unit">
    `;
    ingredientsContainer.appendChild(ingredientField);
});

const recipeForm = document.getElementById('recipeForm');

recipeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(recipeForm);

  fetch('/add_recipe', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log('Recipe added successfully');
      window.location.href = '/index.html';
    } else {
      console.error('Failed to add recipe');
    }
  })
  .catch(error => {
    console.error('Error adding recipe:', error);
  });
});
