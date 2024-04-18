var userInput = $('#userInput');
var storageKey = 'RecipeInfo';

$('#form').on('submit', recipeSearch);

if (localStorage.length > 0) {
    localStorage.clear();
}

// function gathers potentially recipes based off of user search term
function recipeSearch(event) {
    event.preventDefault();
    if ($('#recipes')[0].children.length > 0) $('#recipes')[0].innerHTML = '';
    var getRecipe = `https://api.api-ninjas.com/v1/recipe?query=${userInput.val()}`;
    var header = { 'X-Api-Key': '95B1uzEGa6q38k9hp6ChSQ==FiRE0oDvehzoCYPW' }

    fetch(getRecipe, { headers: header })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            createButtons(data)
        })
};


// function creates buttons for each recipe returned from recipe search
// function also listens for button click and gathers nutritional data from 2nd API
function createButtons(testData) {
    let count = 0;
    for (var i = 0; i < testData.length; i++) {
        // Create Elements
        var div = $(`<div class="Recipe-Container">`);
        var imgs = $(`<img src="${getImage(testData[i].title)}">`);
        var h3 = $(`<h6>`);
        var buttons = $(`<button id="${count}" >View Recipe</button>`);

        // Append Elements to HTML
        h3[0].append(testData[i].title);
        $('#recipes')[0].append(div[0]);
        $('.Recipe-Container')[i].append(imgs[0]);
        $('.Recipe-Container')[i].append(h3[0]);
        $('.Recipe-Container')[i].append(buttons[0]);

        // Add Eventlisteners to buttons
        buttons.on('click', function () {
            var data = testData[parseInt(this.id)];
            var imgSrc = $('.Recipe-Container')[parseInt(this.id)].children[0].src;
            data['ImageUrl'] = imgSrc;
            localStorage.setItem(storageKey, JSON.stringify(data));
            location.replace('../HTML/Recipe.html');
        })
        count++;
    }
}

// This function returns images dynamically
function getImage() {
    return '../Images/shopping.webp'
}


// api_key=4316b01c99a1dbeabb1ab7278f73b452dc3257c034202c000ef97313c36037fc&q=Ribs&engine=google_images&name=images_results


// Google api key AIzaSyD37RbkzPjO1OSjdfsi7RCConjksnwjAYc