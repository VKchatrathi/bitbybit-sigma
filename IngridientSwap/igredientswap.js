const apiKey = 'c21762e803a9480680f2aaecf1e16952';  // Replace with your actual Spoonacular API Key
        const apiUrl = 'https://api.spoonacular.com/recipes/random?apiKey=' + apiKey;

        document.getElementById('fetchRecipeBtn').addEventListener('click', fetchRandomRecipe);

        function fetchRandomRecipe() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Get the recipe data
                    const recipe = data.recipes[0]; // Assuming we only fetch one random recipe
                    const recipeDiv = document.getElementById('recipeData');
                    
                    // Display the recipe info
                    recipeDiv.innerHTML = `
                        <h2>${recipe.title}</h2>
                        <img src="${recipe.image}" alt="${recipe.title}" style="width: 300px; height: auto;">
                        <p><strong>Instructions:</strong> ${recipe.instructions || "No instructions available"}</p>
                    `;
                })
                .catch(error => {
                    console.log('Error fetching data: ', error);
                });
        }