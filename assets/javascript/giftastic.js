$(document).ready(function () {
    var games = ["Apex Legends", "Halo", "Counter-Strike", "Tribes Ascend", "Stardew Valley", "Quake", "PUBG", "Overwatch", "Rainbow Six", "Rocket League", "Dota 2", "Overcooked", "Starcraft", "Gears of War", "Titanfall", "Left 4 Dead", "Call of Duty", "Battlefield 5", "Portal", "Terraria"];
    var animateTracker = [];

    function drawButtons() {
        //Clears the buttonDiv
        $("#buttonDiv").empty();

        //For each game in the array
        for (var i = 0; i < games.length; i++) {
            //Creates a new button
            var newButton = $("<button>");
            //Adds bootstrap style and gifButton class
            newButton.addClass("btn btn-primary gifButton");
            //Adds id to know later on what game we've clicked on
            newButton.attr("id", games[i]);
            //Adds the button text using game array
            newButton.text(games[i]);
            //Appends the new button to the buttonDiv
            $("#buttonDiv").append(newButton);
        }
    }
    
    //Calls drawButtons so that buttons show up when page loads
    drawButtons();

    //When gifButton is clicked
    $("#buttonDiv").on("click", ".gifButton", function () {
        //Clears the GIF div for new gifs
        $("#gifDiv").empty();

        //Provides a random offset for more unique results
        var offset = Math.floor((Math.random() * 50) + 1);

        //Pulls the button id of button clicked on
        var search = $(this).attr("id").trim();

        //sets the giphy url using the search id of button
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&offset=" + offset + "&limit=10&api_key=jnJ7OS1VuSW8ry3Mh4DStJK69YqH54Cx";

        //API query using ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            
            //Loops through the GIPHY response data (length of 10 for this assignment)
            for (var i = 0; i < response.data.length; i++) {

                //My original Code which didn't include adding the Rating... 
                // //Creates new IMG
                // var newGif = $("<img>");
                // //Adds GIF id to the IMG so we know what we're clicking on
                // newGif.attr("id", response.data[i].id);
                // //Adds index value to animateTracker array
                // newGif.attr("index", i);
                // //Adds src to IMG so that it displays GIF
                // newGif.attr("src", response.data[i].images["480w_still"].url);
                // //Adds class gifImage to the image
                // newGif.addClass("gifImage");
                // //Append the GIF rating
                // newGif.append(response.data[i].rating);

                //Creates a div with class gifDiv
                var newGif = $("<div class='gifDiv'>");
                //Adds image with id and src to get GIPHY id and URL to bring into next step (drawing gifs on screen)
                newGif.html("<img class='gifImage' id='"+response.data[i].id+"' src='"+response.data[i].images["480w_still"].url+"'></br>"+"<strong>Rated "+response.data[i].rating+"</strong>");
                //Set default animation state to still
                animateTracker[i] = 0;
                //Appends the new IMG to the gifDiv
                $("#gifDiv").append(newGif);
            }
        });
    });

    //When you click on a class gifImage within the gifDiv section
    $(document).on("click", ".gifImage", function () {
        console.log("clicked");
        //Checks to see what index we've clicked on and compares it to 0 (not animated) or 1 (animated) from animateTracker
        if (animateTracker[$(this).attr("index")] === 0) {

            //Changes the source of image to the animated one
            $(this).attr("src", "https://media1.giphy.com/media/" + $(this).attr("id") + "/giphy.gif");
            //Sets status to "animated"
            animateTracker[$(this).attr("index")] = 1;
        }
        else {
            //Changes the source of image to the still one
            $(this).attr("src", "https://media1.giphy.com/media/" + $(this).attr("id") + "/giphy_s.gif");
            //Sets the status to still
            animateTracker[$(this).attr("index")] = 0;
        }
    });

    //When you click on the Submit button
    $("#submitGame").click(function (event) {
        event.preventDefault();
        //checks to make sure you have typed something in the box
        if ($("#input").val() != "") {
            //Takes value (trimmed) and pushes it at the end of the games array
            games.push($("#input").val().trim());
            //Empties the input field so you can type in another game
            $("#input").val("");
            //Calls the drawButtons function to update the list on screen
            drawButtons();
        }
    });

    //When you hit ENTER on the Submit input field
    $("#input").keypress(function (event) {
        if (event.which == 13) {
            $("#submitGame").click();
        }
    });
});