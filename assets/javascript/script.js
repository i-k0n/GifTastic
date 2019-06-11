// to-do
// add an x to remove colors


// shout-out to htmlcolorcodes.com for sorting the html colors into nice groups. i used their groups to set up these arrays
var colorArrays = [];
    colorArrays[0] = ['Indian Red', 'Light Coral', 'Salmon', 'Dark Salmon', 'Light Salmon', 'Crimson', 'Red', 'Fire Brick', 'Dark Red']; // reds
    colorArrays[1] = ['Pink', 'Light Pink', 'Hot Pink', 'Deep Pink', 'Medium Violet Red', 'Pale Violet Red']; // pinks
    colorArrays[2] = ['Light Salmon', 'Coral', 'Tomato', 'Orange Red', 'Dark Orange', 'Orange']; // oranges
    colorArrays[3] = ['Gold', 'Yellow', 'Light Yellow', 'Lemon Chiffon', 'Light Golden Rod Yellow', 'Papaya Whip', 'Moccasin', 'Peach Puff', 'Pale Golden Rod', 'Khaki', 'Dark Khaki']; // yellows
    colorArrays[4] = ['Lavender', 'Thistle', 'Plum', 'Violet', 'Orchid', 'Fuchsia', 'Magenta', 'Medium Orchid', 'Medium Purple', 'Rebecca Purple', 'Blue Violet', 'Dark Violet', 'Dark Orchid', 'Dark Magenta', 'Purple', 'Indigo', 'Slate Blue', 'Dark Slate Blue', 'Medium Slate Blue']; // purples
    colorArrays[5] = ['Green Yellow', 'Chartreuse', 'Lawn Green', 'Lime', 'Lime Green', 'Pale Green', 'Light Green', 'Medium Spring Green', 'Spring Green', 'Medium Sea Green', 'Sea Green', 'Forest Green', 'Green', 'Dark Green', 'Dark Green', 'Yellow Green', 'Olive Drab', 'Olive', 'Dark Olive Green', 'Medium Aquamarine', 'Dark Sea Green', 'Light Sea Green', 'Dark Cyan', 'Teal']; // greens
    colorArrays[6] = ['Aqua', 'Cyan', 'Light Cyan', 'Pale Turquoise', 'Aquamarine', 'Turquoise', 'Medium Turquoise', 'Dark Turquoise', 'Cadet Blue', 'Steel Blue', 'Light Steel Blue', 'Powder Blue', 'Light Blue', 'Sky Blue', 'Light Sky Blue', 'Deep Sky Blue', 'Dodger Blue', 'Cornflower Blue', 'Medium Slate Blue', 'Royal Blue', 'Blue', 'Medium Blue', 'Dark Blue', 'Navy', 'Midnight Blue']; // blues
    colorArrays[7] = ['Cornsilk', 'Blanched Almond', 'Bisque', 'Navajo White', 'Wheat', 'Burly Wood', 'Tan', 'Rosy Brown', 'Sandy Brown', 'Golden Rod', 'Dark Golden Rod', 'Peru', 'Chocolate', 'Saddle Brown', 'Sienna', 'Brown', 'Maroon']; // browns
    colorArrays[8] = ['Gainsboro', 'Light Gray', 'Silver', 'Dark Gray', 'Dark Souls' /* this isn't really a color */, 'Gray', 'Dim Gray', 'Light Slate Gray', 'Slate Gray', 'Dark Slate Gray', 'Black'] // grays
var colors = [];
var randomNum = (Math.floor(Math.random() * 9));
    colors = colorArrays[randomNum];
    // console.log(colors);

var offSet = "0";
var limit = "15";
var color;





function addButtons() {
    var colorButtonDiv = $('.color-buttons');
    // empty button container before adding new colors
    colorButtonDiv.empty();
    $(colors).each(function(index) {

        // remove whitespace from string
        // str.replace(/ /g,'');
        
        color = colors[index];

        // remove spaces from search string since HTML color names don't use them
        strippedColor = color.replace(/\s/g, '');
        // create button for selecting colors
        var newButton = $("<button>");
        // add a class to the button for styling
        newButton.addClass("color");
        // set color as button's data attribute for reference later
        newButton.attr("data-name", color);
        // Providing the initial button text
        newButton.text(color);
        // set background color to that of the button's text
        newButton.css({'background-color': strippedColor});
        // add the button to the .color-buttons div
        colorButtonDiv.append(newButton);

        // use colors.js to split its RGB output into an array for checking values
        var splitColor = $c.name2rgb(strippedColor).RGB.split(" ");
        // set up variables for the passed arguments
        var r = splitColor[0];
        var g = splitColor[1];
        var b = splitColor[2];
        var chooseLabelColor = function(r, g, b) {
            // W3C formula for checking contrast, returns value between 0 - 255:
            // ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
            brightnessValue = ((r * 299) + (g * 587) + (b * 114)) / 1000;
            // console.log("brightnessValue: ", brightnessValue);

            // if our brightness value is too bright, use dark text on the button
            if (brightnessValue > 184) {
                // bright, use black text
                newButton.css('color', '#666');

            // otherwise use white text
            } else {
                // dark, use white text
                newButton.css('color', '#fff');
            }
        }

        // run function to check background brightness for choosing the correct text color
        chooseLabelColor(r, g, b);
    });
}


// set click handler to add the input color to the list of color buttons
$("#add-color").on("click", function(event) {
    // don't refresh the page!
    event.preventDefault();
    // save the input color to a variable
    inputVal = $("#color-input").val();
    
    // make sure input box is not empty. we don't want empty tags
    if (inputVal) {
        // This line grabs the input from the textbox
        var color = $("#color-input").val().trim();

        // add input color to colors array
        colors.push(color);
        // clear input box to reset for next input
        $('#color-input').val("");
        // call function to process input and add a new button
        addButtons();
    }

});


// set a click handler to add a random color from a preset array to the list of color buttons
$("#add-random-color").on("click", function(event) {
    // don't refresh the page!
    event.preventDefault();

    // choose a random number for selecting a random color from the color name array
    var randomIndex = Math.floor(Math.random() * CSS_COLOR_NAMES_WITH_SPACES.length)
    
    // save random color as variable
    var color = CSS_COLOR_NAMES_WITH_SPACES[randomIndex];

    // add input color to colors array
    colors.push(color);

    // call function to process input and add a new button
    addButtons();

});


// create a function to request and display gifs
function displayColorGifs() {

    // empty the gifs container before requesting new gifs
    $('.gifs').empty();
    // chance any spaces in the color name to hyphens for adding to the API search
    var color = $(this).attr('data-name').replace(/\s+/g, '-').toLowerCase();
    // console.log(color)
    // the API key
    var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    // the number of gifs we want returned
    var limit = "15";
    // the maximum rating of gif we want
    var rating = "pg-13";
    // our URL to search
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + color + "&api_key=" + apiKey + "&rating=" + rating + "&limit=" + limit;
    
    // send an AJAX request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response) // our returned object
        for (let i = 0; i < response.data.length; i++) {
            // store partial object path as variable for speedy typing
            const element = response.data[i];
            // store div as variable
            var gifsDiv = $('.gifs');
            // create a new div for each gif
            var gifDivs = $('<div class="gif-container">');
            // create an image tag to hold each gif
            var image = $('<img class="gif">');
            // create a container to hold the rating
            var rating = $('<span class="gif-rating">');
            gifsDiv.append(gifDivs);
            // get each piece of data from the object and put it in its proper place
            gifDivs.append(
                $(image).attr({
                    'src': element.images.fixed_width_still.url, 
                    // still images so the web page isn't going so slowly
                    'data-still': element.images.fixed_width_still.url, 
                    // animated images for when you're ready to party
                    'data-animate': element.images.fixed_width.url, 
                    // set a class for styling
                    'class': 'gif',
                    // set default state
                    'data-state': 'still'
                }),
                // display rating text
                $(rating).text(element.rating)
            )
        // set a condition for a return of an error
        }
    })
}


// set a click handler for unpausing/pausing gifs
$(document).on("click", ".gif", function() {

    // set up our variables
    var state = $(this).attr('data-state');
    var stillData = $(this).attr('data-still')
    var animateData = $(this).attr('data-animate')
    
    // if the gif is static
    if (state === "still") {
        // make it do something
        $(this).attr("src", animateData);
        $(this).attr('data-state', 'animate');
    // if it's moving
    } else if (state === "animate") {
        // make it stop
        $(this).attr("src", stillData);
        $(this).attr('data-state', 'still');
    }
});


// jQuery UI widget for autocomplete to help users find a color to search
$( "#color-input" ).autocomplete({
    source: CSS_COLOR_NAMES_WITH_SPACES
  });


// set a hover event listener to display the rating so it's only showing
// when the gifs are hovered over
$(document).on({
    mouseenter: function () {
        // show rating on mouse enter
        $('.gif-rating').css('opacity', '1')
    },
    mouseleave: function () {
        // hide rating on mouse leave
        $('.gif-rating').css('opacity', '0')
    }
}, ".gif-container");


// our main click handler for displaying gifs when a color is selected
$(document).on("click", ".color", displayColorGifs);

// add those color buttons to the page
addButtons();



