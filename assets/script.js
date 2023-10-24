var userInput = $('#userInput');
var formSubmit = document.getElementById("contact-form");

// function gathers potentially recipes based off of user search term

function recipeSearch(event) {
    var getRecipe = `https://api.api-ninjas.com/v1/recipe?query=${userInput.val()}`;

    event.preventDefault()
    fetch(getRecipe, {

        headers: {
            'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW',
        }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            createButtons(data)
        })
};





$('#form').on('submit', recipeSearch);

// function creates buttons for each recipe returned from recipe search
// function also listens for button click and gathers nutritional data from 2nd API

function createButtons(testData) {
    for (var recipe of testData) {
        var buttons = $(`<button> ${recipe.title} </button>`);
        buttons.appendTo('#recipes');
        buttons.on('click', function () {
            var title = $(this).text();
            var getRecipe = `https://api.api-ninjas.com/v1/nutrition?query=${title}`;
            fetch(getRecipe, {
                headers: {
                    'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW'
                }
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                let totalCalories = 0;
                let totalCarbohydrates = 0;
                let totalCholesterol = 0;
                let totalSaturatedFat = 0;
                let totalTotalFat = 0;
                let totalFiber = 0;
                let totalPotassium = 0;
                let totalProtein = 0;
                let totalSodium = 0;
                let totalSugar = 0;

                for(let nutritionFact of data) {
                    totalCalories += nutritionFact.calories;
                    totalCarbohydrates += nutritionFact.carbohydrates_total_g;                    
                    totalCholesterol += nutritionFact.cholesterol_mg;                   
                    totalSaturatedFat += nutritionFact.fat_saturated_g;
                    totalTotalFat += nutritionFact.fat_total_g;
                    totalFiber += nutritionFact.fiber_g;
                    totalPotassium += nutritionFact.potassium_mg;
                    totalProtein += nutritionFact.protein_g;
                    totalSodium += nutritionFact.sodium_mg;
                    totalSugar += nutritionFact.sugar_g;
                    
                }
                
                console.log(totalCarbohydrates)
                console.log(totalCholesterol)
                console.log(totalSaturatedFat)
                console.log(totalTotalFat)
                console.log(totalFiber)
                console.log(totalPotassium)
                console.log(totalProtein)
                console.log(totalSodium)
                console.log(totalSugar)
                console.log(totalCalories)
    
                    return fetch(`https://api.api-ninjas.com/v1/recipe?query=${title}`, {
                        headers: {
                            'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW',
                        }
                    })
                })
                .then(function (response) {
                    return response.json()
                })
        }
        )
    }
    }
    
formSubmit.addEventListener("submit", function (event) {
    event.preventDefault();
    var data= new FormData(this);
    for(var[key, value]of data){
        console.log(key + value)
    }
    console.log(data.keys())
    // console.log(event.target[0].value)


});