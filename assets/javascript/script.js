// take search data
//   set as button name
//   search api with it
//  remove spaces
//    store as data-name
//    set label bg color

// to-do
// make 'add' and 'random' buttons move to next line at certain break points
// add an x to remove colors
// add autocomplete to help users find a color
// add functionality to random button
//   color = math.Random on CSS_COLOR_NAMES_WITH_SPACES array

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





function addButtons() {
    var colorButtonDiv = $('.color-buttons');
    // empty button container before adding new colors
    colorButtonDiv.empty();
    $(colors).each(function(index) {

        // remove whitespace from string
        // str.replace(/ /g,'');
        
        var color = colors[index];

        // remove spaces from search string since HTML color names don't use them
        strippedColor = color.replace(/\s/g, '');
        var newButton = $("<button>");
        // Adding a class of movie to our button
        newButton.addClass("color");
        // Adding a data-attribute
        newButton.attr("data-name", color);
        // Providing the initial button text
        newButton.text(color);
        newButton.css({'background-color': strippedColor});
        // Adding the button to the buttons-view div
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
            if (brightnessValue > 184) {
                // bright, use black text
                newButton.css('color', '#666');
                // return true;
            } else {
                // dark, use white text
                newButton.css('color', '#fff');
                // return false;
            }
        }

        // run function to check background brightness for choosing the correct text color
        chooseLabelColor(r, g, b);

        // use returned value to set text color
        // if (!chooseLabelColor) {
        //     newButton.css('color', 'black');
        // } else {
        //     newButton.css('color', 'white');
        // }
    });
}

var chooseLabelColor = function(r, g, b) {
    // W3C formula for checking contrast, returns value between 0 - 255:
    // ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
    brightnessValue = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    // console.log("brightnessValue: ", brightnessValue);
    if (brightnessValue > 127) {
        // bright, use black text
        return true;
    } else {
        // dark, use white text
        return false;
    }
}

$("#add-color").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var color = $("#color-input").val().trim();

    // add input color to colors array
    colors.push(color);
    // clear input box to reset for next input
    $('#color-input').val("");
    // call function to process input and add a new button
    addButtons();

});

$("#add-random-color").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var randomIndex = Math.floor(Math.random() * CSS_COLOR_NAMES_WITH_SPACES.length)
    // console.log(CSS_COLOR_NAMES_WITH_SPACES.length)
    // console.log(Math.floor(Math.random() * CSS_COLOR_NAMES_WITH_SPACES.length))
    // CSS_COLOR_NAMES_WITH_SPACES
    var color = CSS_COLOR_NAMES_WITH_SPACES[randomIndex];

    // add input color to colors array
    colors.push(color);
    // call function to process input and add a new button
    addButtons();

});

function displayColorGifs() {

    // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
    $('.gifs').empty();
    var color = $(this).attr('data-name').replace(/\s+/g, '-').toLowerCase();
    // console.log(color)
    var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    var limit = "15";
    var rating = "pg-13";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + color + "&api_key=" + apiKey + "&rating=" + rating + "&limit=" + limit;
    var colorDiv = $('<div>');
    
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    //   console.log(JSON.stringify(response))
        // console.log(response)
        for (let i = 0; i < response.data.length; i++) {
            const element = response.data[i];
            var gifsDiv = $('.gifs');
            var gifDivs = $('<div class="gif-container">');
            var image = $('<img class="gif">');
            var rating = $('<span class="gif-rating">');
            gifsDiv.append(gifDivs);
            gifDivs.append(
                $(image).attr({
                    'src': element.images.fixed_width_still.url, 
                    'data-still': element.images.fixed_width_still.url, 
                    'data-animate': element.images.fixed_width.url, 
                    'class': 'gif',
                    'data-state': 'still'
                }),
                $(rating).text(element.rating)
            // gifsDiv.append("<img src='" + element.images.fixed_width_still.url + "' />");
            )
        // set a condition for a return of an error
        }
    })
}

$(document).on("click", ".gif", function() {

    var state = $(this).attr('data-state');
    var src = $(this).attr('src');
    var stillData = $(this).attr('data-still')
    var animateData = $(this).attr('data-animate')
    
    // console.log("src1: ", src);
    if (state === "still") {
        
        $(this).attr("src", animateData);
        $(this).attr('data-state', 'animate');
        // console.log("src2: ", src);
        // console.log("state2: ", state);
    } else if (state === "animate") {
        
        $(this).attr("src", stillData);
        $(this).attr('data-state', 'still');
        // console.log("src3: ", src);
        // console.log("state3: ", state);
    }
});

// jQuery UI widget for autocomplete to help users find a color to search
$( "#color-input" ).autocomplete({
    source: CSS_COLOR_NAMES_WITH_SPACES
  });

$(document).on({
    mouseenter: function () {
        //stuff to do on mouse enter
        console.log('.' + $(this).attr('class'))
        $('.gif-rating').css('opacity', '1')
    },
    mouseleave: function () {
        //stuff to do on mouse leave
        $('.gif-rating').css('opacity', '0')
    }
}, ".gif-container");
$(document).on("click", ".color", displayColorGifs);
addButtons();
