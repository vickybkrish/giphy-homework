var dunkers = ["Harry Potter", "Jungle Book", "Finding Nemo"];

function makeButtons() {

    $("#dunkers").empty();
    for (var i = 0; i < dunkers.length; i++) {
        var a = $("<button>");
        a.addClass("dunker");
        a.addClass("btn");
        a.addClass("btn-default");
        a.addClass("btn-primary");
        a.attr("data-name", dunkers[i]);
        a.text(dunkers[i]);
        $("#dunkers").append(a);
    }
}


makeButtons();

$("#add-dunker").on("click", function(event) {
    event.preventDefault();
    var favoriteDunker = $("#favorite-dunker").val().trim();
    dunkers.push(favoriteDunker);
    makeButtons();

});



$(document).on("click", '.dunker', function() {
    $("#dunker-gifs").empty();
    var currentDunker = $(this).attr("data-name");
    //var cDClass = "<div class='gif'>";
    var queryURL = "//api.giphy.com/v1/gifs/search?q=" +
        currentDunker + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response);
            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var dunkerImage = $("<img>");
                dunkerImage.attr("src", results[i].images.fixed_height_still.url);
                dunkerImage.attr("data-state", "still");
                // dunkerImage.attr("data-state", results[i]);
                dunkerImage.attr("class", "frame");
                dunkerImage.attr("data-animate", results[i].images.fixed_height.url);
                dunkerImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifDiv.prepend(p);
                gifDiv.prepend(dunkerImage);

                $("#dunker-gifs").prepend(gifDiv);




            }


        });

    $(document).on("click", ".frame", function() {
        console.log("clicked!");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });



});



