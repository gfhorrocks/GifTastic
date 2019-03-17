$(document).ready(function () {
    var games = ["Apex Legends", "Halo", "Counter-Strike", "Tribes Ascend", "Stardew Valley", "Quake", "PUBG", "Overwatch", "Rainbow Six", "Rocket League", "Dota 2", "Overcooked", "Starcraft", "Gears of War", "Titanfall", "Left 4 Dead", "Call of Duty", "Battlefield 5", "Portal", "Terraria"];

    function drawButtons() {
        //For each game in the array
        for (var i = 0; i < games.length; i++) {
            //Creates a new button
            var newButton = $("<button>");

            //Adds gifButton class and bootstrap style
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

    $(".gifButton").on("click", function () {

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
            // console.log(response);

            //Loops through the GIPHY response data (length of 10 for this assignment)
            for (var i = 0; i < response.data.length; i++) {

                //Creates new IMG
                var newGif = $("<img>");

                //Adds GIF id to the IMG so we know what we're clicking on
                newGif.attr("id", response.data[i].id);
                //Adds src to IMG so that it displays GIF
                newGif.attr("src", response.data[i].images["480w_still"].url);

                //Appends the new IMG to the gifDiv
                $("#gifDiv").append(newGif);
            }
        });
    });
});