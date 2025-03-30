document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'c21762e803a9480680f2aaecf1e16952'; 
  
    
    document.getElementById('healthifyForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
  
        
        const dishName = document.getElementById('dish').value;
        const dietType = document.getElementById('diet').value;
        const maxCal = document.getElementById('maxCalories').value;
        
  
        
        const recipeApiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&apiKey=${apiKey}&diet=${dietType}&maxCalories=${maxCal}&number=30&addRecipeNutrition=true`;
  
        fetch(recipeApiUrl)
            .then(response => response.json())  
            .then(data => {
                let recipeHTML = '';
                if (data.results && data.results.length > 0) {
                    
                    data.results.forEach(recipe => {
                        recipeHTML += `  
                            <div>
                            <button type="button" class="save" onclick="save(${recipe.id},${recipe.title}, ${recipe.image}, ${recipe.id})">save</button>
                            <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">
                                  <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: auto; border-radius: 10px;">
                                  <h3>${recipe.title}</h3>
                                  </a>
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
    });
});