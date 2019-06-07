var colors = [];
var colorButtonDiv = $('.color-buttons');

function addButtons() {
    // empty button container before adding new colors
    colorButtonDiv.empty();
    $(colors).each(function(index) {
        var color = colors[index];
        var newButton = $("<button>");
        // Adding a class of movie to our button
        newButton.addClass("color");
        // Adding a data-attribute
        newButton.attr("data-name", color);
        // Providing the initial button text
        newButton.text(color);
        newButton.css({'background-color': color});
        // Adding the button to the buttons-view div
        colorButtonDiv.append(newButton);

        // use colors.js to split its RGB output into an array for checking values
        var splitColor = $c.name2rgb(color).RGB.split(" ");
        var r = splitColor[0];
        var g = splitColor[1];
        var b = splitColor[2];

        chooseLabelColor(r, g, b);
        if (!chooseLabelColor) {
            newButton.css('color', 'black');
        } else {
            newButton.css('color', 'white');
        }
        
        // console.log(splitColor)
    });
}

var chooseLabelColor = function(r, g, b) {
    // W3C formula for checking contrast
    // ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
    // if our value is > 50% use black text
    // else use white text
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

    // The movie from the textbox is then added to our array
    colors.push(color);
    $('#color-input').val("");
    // Calling renderButtons which handles the processing of our movie array
    addButtons();

  });