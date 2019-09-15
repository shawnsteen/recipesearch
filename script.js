//wait for load then initilize
let myIngredients;
let ingredientArr = [];
const myApi = "22c8aa84037abb1538e4543b87437041";
let ingredientList = document.getElementById('ingredient-list');
let ingredientForList = document.querySelector('#ingredient-for-list');

window.onload = function init() {
    main();
 }

//Main fuctionality
function main() {
    const nameSearchButton = document.querySelector('#search-by-name-button');
    nameSearchButton.addEventListener("click", searchForARecipe);

    const addIngredientButton = document.querySelector('#add-ingredient-button');
    addIngredientButton.addEventListener("click", addIngredient);
    
    const searchByIngredientButton = document.querySelector('#search-by-ingredient-button');
    searchByIngredientButton.addEventListener("click", searchByIngredients);
    // makeIngredientList();
    // searchByIngredients();
    
}

//Basic search
function searchForARecipe() {
    let name = document.querySelector('#name-search');
    myIngredients = name.value;
    //  console.log(name.value);
    //  console.log(searchUrl);
    fetch("https://www.food2fork.com/api/search?key=" + myApi + "&q=" + myIngredients)
    .then(data=>{return(data.json())})
    .then(res=>{displayResults(res)});
}

function displayResults(results) {
    let myRecipes = results.recipes;
    let images = [];
    let titles = [];
    let linkLocation = [];
    let searchResultsContainer = document.querySelector('#search-results-container');
    for(let i = 0; i < myRecipes.length; i++) {
        images.push(myRecipes[i].image_url);
        titles.push(myRecipes[i].title);
        linkLocation.push(myRecipes[i].f2f_url);
        //console.log(myRecipes[i]);
    }

    myRecipes.forEach(function(ele, index) {
        let newRecipeContainer = document.createElement('a');
        let newTitle = document.createElement('span')
        let newImage = document.createElement('IMG');
        newRecipeContainer.href = linkLocation[index];
        newRecipeContainer.classList.add('recipe-container')
        newTitle.innerText = titles[index];
        newImage.src = images[index];
        searchResultsContainer.appendChild(newRecipeContainer);
        newRecipeContainer.appendChild(newTitle);
        newRecipeContainer.appendChild(newImage);
    })
}
//End basic search

//Ingredient search
//Build ingredient list

function addIngredient() {
    
    ingredientForList = document.querySelector('#ingredient-for-list').value;
    ingredientArr.push(ingredientForList);
    let newIngredientItem = document.createElement('li');
    newIngredientItem.innerText = ingredientForList;
    ingredientList.appendChild(newIngredientItem);
}

function listenForEnter() {
    if(event.keyCode === 13) {
        addIngredient();
    }
}

//Search
function searchByIngredients() {
    myIngredients = "";
    ingredientArr.forEach(function(ele, index) {
        myIngredients += ele + ", "
    })
    //  console.log(name.value);
    //  console.log(searchUrl);
    fetch("https://www.food2fork.com/api/search?key=" + myApi + "&q=" + myIngredients)
    .then(data=>{return(data.json())})
    .then(res=>{displayResults(res)});
}

 //main();