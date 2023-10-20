var userInput = $('#userInput');

function recipeSearch(event) {
    var getRecipe = `https://api.api-ninjas.com/v1/recipe?query=${userInput.val()}`;

    // console.log(userInput.val())
    event.preventDefault()
    fetch(getRecipe, {

        headers: {
            'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW',
        }
    })
        .then(function (response) {
            // console.log(response)
            return response.json()
        })
        .then(function (data) {
            // console.log(data)
            createButtons(data)
            // data.ingredients = data.ingredients.replaceAll('|', '\n');
            // console.log(data.ingredients);
        })
};





$('#form').on('submit', recipeSearch);


function createButtons(testData) {
    for (var i = 0; i < testData.length; i++) {
        var buttons = $('<button>' + testData[i].title + '</button>');
        buttons.appendTo('#recipes');

        buttons.on('click', function () {
            var title = $(this).text();
            // console.log('Fetching data: ', title)

            var getRecipe = `https://api.api-ninjas.com/v1/nutrition?query=${title}`;

            fetch(getRecipe, {

                headers: {
                    'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW',
                }
            })
                .then(function (response) {
                    return response.json()

                })
                .then(function (data) {
                    for (var j of data) {
                        console.log(j)
                        var nutritionItem = data[j];
                            var totalCalories = j.calories;
                            var totalCarbohydrates = 0;
                            var totalCholesterol = 0;
                            var totalSaturatedFat = 0;
                            var totalTotalFat = 0;
                            var totalFiber = 0;
                            var totalPotassium = 0;
                            var totalProtein = 0;
                            var totalSodium = 0;
                            var totalSugar = 0;
                            console.log(totalCalories)
                        
                    }

                    // ingredients based off of local storage or global variable.
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


// Replace | with \n look into replaceall method. Regex-replace stuff. Split for loop and | = \n
// encodeURI for clean inputs
