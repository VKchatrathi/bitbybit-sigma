document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'c21762e803a9480680f2aaecf1e16952'; // Insert your Spoonacular API key here

  // Listen for the form submission
  document.getElementById('swapForm').addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent form from refreshing the page

      // Get the values entered by the user
      const dishName = document.getElementById('dish').value;
      const ingredient = document.getElementById('ingredient').value;

      // Step 1: Fetch recipes based on dish name
      const recipeApiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&apiKey=${apiKey}`;

      fetch(recipeApiUrl)
          .then(response => response.json())  // Convert response to JSON format
          .then(data => {
              let recipeHTML = '';
              if (data.results && data.results.length > 0) {
                  // If recipes are found, display them
                  data.results.forEach(recipe => {
                      recipeHTML += `
                          <div>
                              <h3>${recipe.title}</h3>
                              <img src="${recipe.image}" alt="${recipe.title}" style="width: 150px; height: auto;">
                              <p><a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a></p>
                          </div>
                      `;
                  });
              } else {
                  recipeHTML = '<p>No recipes found. Please try another dish.</p>';
              }
              // Display the recipe results
              document.getElementById('recipeResults').innerHTML = recipeHTML;
          })
          .catch(error => {
              console.error('Error fetching recipe:', error);
          });

      // Step 2: Fetch ingredient substitutions based on the ingredient name
      const substitutionApiUrl = `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredient}&apiKey=${apiKey}`;

      fetch(substitutionApiUrl)
          .then(response => response.json())  // Convert response to JSON format
          .then(data => {
              let substitutionHTML = '';
              if (data.substitutes && data.substitutes.length > 0) {
                  // If substitutions are found, display them
                  data.substitutes.forEach(sub => {
                      substitutionHTML += `<p>${sub}</p>`;
                  });
              } else {
                  substitutionHTML = '<p>No substitutions found.</p>';
              }
              // Display the substitution results
              document.getElementById('substitutionResults').innerHTML = substitutionHTML;
          })
          .catch(error => {
              console.error('Error fetching substitutions:', error);
          });
  });
});
