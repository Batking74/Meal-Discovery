var userInput = $('#userInput');
// var getIngredient = `https://api.api-ninjas.com/v1/nutrition?query=${userInput}`;


function recipeSearch(event) {
    var getRecipe = `https://api.api-ninjas.com/v1/recipe?query=${userInput.val()}`;

    console.log(userInput.val())
    event.preventDefault()
    fetch(getRecipe, {

        headers: {
            'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW',
        }
    })
        .then(function (response) {
            console.log(response)
            // return response.json();
        })
    // .then(function (data) {
    //     console.log(data)
    //     console.log('dfsd')

    // });
};









$('#form').on('submit', recipeSearch);