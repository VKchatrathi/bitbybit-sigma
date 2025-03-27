document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'c21762e803a9480680f2aaecf1e16952'; 

  
   function showFavorites() {
    
    
      const dishName = localStorage.getItem("save: "+itemname+'title');
      const dishimg = localStorage.getItem("save: "+itemname+'img');
      const dishid = localStorage.getItem("save: "+itemname+'id');
      
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
              
              document.getElementById('favoritesResults').innerHTML = recipeHTML;
          })
          .catch(error => {
              console.error('Error fetching recipe:', error);
          });

      
    
      }
    });