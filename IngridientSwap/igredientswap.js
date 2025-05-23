
document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'c21762e803a9480680f2aaecf1e16952'; 

  
  document.getElementById('swapForm').addEventListener('submit', function(event) {
      event.preventDefault(); 

      
      const dishName = document.getElementById('dish').value;
      const ingredient = document.getElementById('ingredient').value;

      
      const recipeApiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&apiKey=${apiKey}&excludeIngredients=${ingredient}&number=30`;

      fetch(recipeApiUrl)
          .then(response => response.json())  
          .then(data => {
              let recipeHTML = '';
              if (data.results && data.results.length > 0) {
                  
                  data.results.forEach(recipe => {
                      recipeHTML += `  
                      
                          <div id="recipeCard">
                          <button type="button" class="save" onclick="save((''${recipe.title}''))">save</button>
                          <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">
                                <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: auto; border-radius: 10px;">
                                <h3>${recipe.title}</h3>
                                </a>
                          </div>

                      `;
                  });
              } else {
                  recipeHTML = '<p style="text-align: center">No recipes found. Please try another dish.</p>';
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

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'c21762e803a9480680f2aaecf1e16952'; 
  
    
    function genWaver(id){
        const genWaverApiUrl = `https://api.spoonacular.com/recipes/${id}/card`;
  
        fetch(genWaverApiUrl)
            .then(response => response.json())  
            .then(data => {
                let waverHTML = '';
                if (data.results && data.results.length > 0) {
                    
                    data.results.forEach(waver => {
                        waverHTML += `  
                            <div id="recipeWaver">
                                  <img src="${waver.url}" style="width: 100%; height: auto; display: flex; justify-self: center; z-index: 90;">
                            </div>
                            
  
                        `;
                    });
                } else {
                    waverHTML = '<p style="text-align: center">No recipes found. Please try another dish.</p>';
                }
                
                document.getElementById('waver').innerHTML = waverHTML;
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
            });
    };
  
    
});

function save(title) {
    alert('Recipe saved!');
    localStorage.setItem("title", title);
    console.log("Saved recipe:", title);
}