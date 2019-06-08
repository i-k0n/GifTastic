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




var colors = [];


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

// keep that page from reloading on click
// $('#add-color').click(function(event) {
//     event.preventDefault();
//     addButtons();
// })

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
    console.log(CSS_COLOR_NAMES_WITH_SPACES.length)
    console.log(Math.floor(Math.random() * CSS_COLOR_NAMES_WITH_SPACES.length))
    // CSS_COLOR_NAMES_WITH_SPACES
    var color = CSS_COLOR_NAMES_WITH_SPACES[randomIndex];

    // add input color to colors array
    colors.push(color);
    // call function to process input and add a new button
    addButtons();

  });


  //GIPHY
//   var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {
//       console.log(response);
//     });

    function displayColorGifs() {

        // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
        $('.gifs').empty();
        var color = $(this).attr('data-name').replace(/\s+/g, '-').toLowerCase();
        console.log(color)
        var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
        var limit = "15";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + color + "&api_key=" + apiKey + "&limit=" + limit;
        var colorDiv = $('<div>');
        
        

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        //   console.log(JSON.stringify(response))
        console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                $('.gifs').append("<img src='" + element.images.fixed_width.url + "' />");
            }
        

        // set a condition for a return of an error

        })


      }

      $(document).on("click", ".color", displayColorGifs);