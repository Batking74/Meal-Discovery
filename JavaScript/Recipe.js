var data = JSON.parse(localStorage.getItem('RecipeInfo'));
let title = $('title')[0];
let heading = $('h1')[0];
let image = $('#Recipe-Image')[0];
let recipeIngredients = $('#Recipe-Ingredients-Container')[0].children[1];
let recipeInstructions = $('#Recipe-Instructions-Container')[0].children[1];
let nutritionFactsContainer = $('#Nutrition-Facts')[0];

let nutritionFacts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// Displaying Recipe Results
title.textContent = `${data.title} Recipe`;
heading.textContent = data.title;
image.setAttribute('src', data.ImageUrl);
image.setAttribute('alt', `${data.title} Image`);
recipeIngredients.textContent = data.ingredients;
recipeInstructions.textContent = data.instructions;

var getRecipe = `https://api.api-ninjas.com/v1/nutrition?query=${data.title}`;

fetch(getRecipe, {
    headers: { 'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW' }
})
.then(function (response) {
    return response.json();
})
.then(function (data) {

    // Calculating Nutrition Facts
    for(let nutritionFact of data) {
        nutritionFacts[0] += nutritionFact.calories;
        nutritionFacts[1] += nutritionFact.serving_size_g;
        nutritionFacts[2] += nutritionFact.fat_total_g;
        nutritionFacts[3] += nutritionFact.fat_saturated_g;
        nutritionFacts[4] += nutritionFact.protein_g;
        nutritionFacts[5] += nutritionFact.sodium_mg;
        nutritionFacts[6] += nutritionFact.potassium_mg;
        nutritionFacts[7] += nutritionFact.cholesterol_mg;
        nutritionFacts[8] += nutritionFact.carbohydrates_total_g;
        nutritionFacts[9] += nutritionFact.fiber_g;
        nutritionFacts[10] += nutritionFact.sugar_g;
    }

    // Displaying Nutrition Facts
    for(let i = 0; i < nutritionFacts.length; i++) {
        const nutritionKeys = Object.keys(data[0])[i];
        if(nutritionKeys != 'name') {
            const p = $('<p>')[0];
            p.textContent = `${removeChar(nutritionKeys)}: ${Math.round(nutritionFacts[i])}`;
            nutritionFactsContainer.append(p);
        }
    }
})

// String Algorithm
function removeChar(string) {
    let newString = string.substring(0,1).toUpperCase();
    for(let i = 1; i < string.length; i++) {
        let letter = string.substring(i, i + 1);
        if(letter === '_') letter = ' ';
        newString += letter;
    }
    return newString;
}