// add_recipe.js
const recipeForm = document.getElementById('recipeForm');

recipeForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(recipeForm);

    // Send form data to backend
    fetch('/add_recipe', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Recipe added successfully');
            // Redirect or perform any other action upon successful addition
            window.location.href = '/featured.html'; // Redirect to featured page
        } else {
            console.error('Failed to add recipe');
        }
    })
    .catch(error => {
        console.error('Error adding recipe:', error);
    });
});