const addIngredientButton = document.getElementById('add-ingredient');
const removeIngredientButton = document.getElementById('remove-ingredient');
const ingredientsContainer = document.getElementById('ingredients-container');
const border = document.getElementById('create-recipe-box');
let height_px = 800
border.style.height = height_px + 'px';

addIngredientButton.addEventListener('click', () => {
    const ingredientField = document.createElement('div');
    ingredientField.style = 'display: flex; align-items: center; justify-content: center;';
    ingredientField.innerHTML = `
        <input type="text" name="ingredientName" placeholder="Ingredient Name" required style="height: 16px;">
        <input type="number" name="ingredientPortion" placeholder="Portion" required style="height: 16px;">
        <input type="text" name="ingredientUnit" placeholder="Unit" required style="height: 16px;">
    `;
    height_px += 22;
    border.style.height = height_px + 'px';
    ingredientsContainer.appendChild(ingredientField);
});

removeIngredientButton.addEventListener('click', () => {
  if(ingredientsContainer.children.length > 1){
    ingredientsContainer.removeChild(ingredientsContainer.lastChild);
    height_px -= 22;
    border.style.height = height_px + 'px';
  }
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
