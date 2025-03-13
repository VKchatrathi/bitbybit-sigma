document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'c21762e803a9480680f2aaecf1e16952'; 

  
  document.getElementById('swapForm').addEventListener('submit', function(event) {
      event.preventDefault(); 

      
      const dishName = document.getElementById('dish').value;
      const ingredient = document.getElementById('ingredient').value;

      
      const recipeApiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&apiKey=${apiKey}`;

      fetch(recipeApiUrl)
          .then(response => response.json())  
          .then(data => {
              let recipeHTML = '';
              if (data.results && data.results.length > 0) {
                  
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
              
              document.getElementById('recipeResults').innerHTML = recipeHTML;
          })
          .catch(error => {
              console.error('Error fetching recipe:', error);
          });

      
      const substitutionApiUrl = `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredient}&apiKey=${apiKey}`;

      fetch(substitutionApiUrl)
          .then(response => response.json())  
          .then(data => {
              let substitutionHTML = '';
              if (data.substitutes && data.substitutes.length > 0) {
                 
                  data.substitutes.forEach(sub => {
                      substitutionHTML += `<p>${sub}</p>`;
                  });
              } else {
                  substitutionHTML = '<p>No substitutions found.</p>';
              }
              
              document.getElementById('substitutionResults').innerHTML = substitutionHTML;
          })
          .catch(error => {
              console.error('Error fetching substitutions:', error);
          });
  });
});
