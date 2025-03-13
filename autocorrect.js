function autocomplete(inp, arr) {
  
  var currentFocus;
  
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      
      this.parentNode.appendChild(a);
      
      for (i = 0; i < arr.length; i++) {
        
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          
          b = document.createElement("DIV");
          
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          
          b.addEventListener("click", function(e) {
             
              inp.value = this.getElementsByTagName("input")[0].value;
              
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        
        currentFocus++;
        
        addActive(x);
      } else if (e.keyCode == 38) { 
        currentFocus--;
        
        addActive(x);
      } else if (e.keyCode == 13) {
        
        e.preventDefault();
        if (currentFocus > -1) {
          
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    
    if (!x) return false;
    
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}



var dishes = [

'asparagus',
'apples',
'avocado',
'alfalfa',
'acorn squash',
'almond',
'arugula',
'artichoke',
'applesauce',
'asian noodles',
'antelope',
'ahi tuna',
'albacore tuna',
'apple juice',
'avocado roll',
'bruschetta',
'bacon',
'black beans',
'bagels',
'baked beans',
'BBQ',
'bison',
'biryani',
'barley',
'bisque',
'bluefish',
'bread',
'broccoli',
'burrito',
'baba ganoush',
'cabbage',
'cake',
'carrots',
'carne asada',
'celery',
'cheese',
'chicken',
'catfish',
'chips',
'chocolate',
'clam chowder',
'clams',
'coffee',
'cookies',
'corn',
'cupcakes',
'crab',
'cereal',
'chimichanga',
'dates',
'duck',
'dumplings',
'donuts',
'eggs',
'enchilada',
'eggrolls',
'english muffins',
'edamame',
'eel sushi',
'fajita',
'falafel',
'franks',
'fondu',
'french toast',
'french dip',
'garlic',
'ginger',
'gnocchi',
'goose',
'granola',
'grapes',
'green beans',
'guacamole',
'gumbo',
'grits',
'graham crackers',
'ham',
'halibut',
'hamburger',
'honey',
'huevos rancheros',
'hash browns',
'hot dogs',
'haiku roll',
'hummus',
'ice cream',
'jambalaya',
'jelly / jam',
'jerky',
'jalapeño',
'kale',
'kabobs',
'ketchup',
'kiwi',
'kidney beans',
'kingfish',
'lobster',
'lamb',
'linguine',
'lasagna',
'meatballs',
'moose',
'milk',
'milkshake',
'noodles',
'ostrich',
'pizza',
'pepperoni',
'porter',
'pancakes',
'quesadilla',
'quiche',
'reuben',
'spinach',
'spaghetti',
'tater tots',
'toast',
'venison',
'waffles',
'wine',
'walnuts',
'yogurt',
'ziti',
'zucchini'];



autocomplete(document.getElementById("dish"), dishes);

ocument.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'c21762e803a9480680f2aaecf1e16952';
  const form = document.getElementById("healthifyForm");

  if (form) {
      // Change "submitbutton" to "submit"
      form.addEventListener("submit", function(event) {
          event.preventDefault();
          const dish = document.getElementById("dish").value.trim();

          if (dish) {
              fetchHealthyRecipes(dish);
          } else {
              alert("Please enter a dish name to search for.");
          }
      });
  }

  function fetchHealthyRecipes(dish) {
      const maxCalories = 500;
      const diet = 'vegetarian';
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${dish}&maxCalories=${maxCalories}&diet=${diet}&number=5`;

      fetch(url)
          .then(response => response.json())
          .then(data => displayRecipes(data.results))
          .catch(error => {
              console.error("Error fetching recipes:", error);
              document.getElementById("recipeResults").innerHTML = "<p>Failed to fetch recipes. Please try again later.</p>";
          });
  }

  function displayRecipes(recipes) {
      const resultsDiv = document.getElementById("recipeResults");

      if (recipes.length > 0) {
          resultsDiv.innerHTML = "<h3>Healthy Recipe Suggestions:</h3><ul>";
          recipes.forEach(recipe => {
              resultsDiv.innerHTML += `
                  <li>
                      <h4>${recipe.title}</h4>
                      <p>Ready in ${recipe.readyInMinutes} minutes, Serves ${recipe.servings} people.</p>
                      <img src="${recipe.image}" alt="${recipe.title}" style="width:100px;">
                      <p><a href="https://spoonacular.com/recipes/${recipe.id}" target="_blank">View Recipe</a></p>
                  </li>
              `;
          });
          resultsDiv.innerHTML += "</ul>";
      } else {
          resultsDiv.innerHTML = "<p>No healthy recipes found for your search. Please try another dish.</p>";
      }
  }
});