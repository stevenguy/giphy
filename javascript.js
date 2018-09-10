// HW INSTRUCTIONS

// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.
// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.
// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.
// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
// 7. Deploy your assignment to Github Pages.


//Declare movies
var movies = ["Avator", "Goodfellas", "Godfather", "Gladiator", "Titanic", "Jaws", "Alien", "Scream", "Rocky", "Scarface", "300"];




function giphyDisplay (){
    var movies = $(this).attr("data-name")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=cs4PVT1eJv2z6QFcoC65bvXM28sSVZqA";
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(queryURL) {
        console.log(queryURL);
      });
}
giphyDisplay()


// movie buttons giphy function giphy buttons movie function
function giphyButtons(){
    $("#giphyButton").empty();
    for (var i = 0; i < movies.length; i++){
        var buttons = $('<button>')
        buttons.attr('data-name', movies[i])
        buttons.text(movies[i])
        buttons.css('margin', '2px')
        $("#giphyButton").prepend(buttons)
    }
}
giphyButtons()


$("button").on("click", function() {
    $("#giphyOutput").empty();
    var movies = $(this).attr("data-name")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=cs4PVT1eJv2z6QFcoC65bvXM28sSVZqA&limit=10";
    console.log(queryURL)

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var giphyDiv = $("<div>")
            var giphyRating = results[i].rating
            var movieImage = $("<img>")
            var rating = $("<p>").text("Giphy Rating: " + giphyRating)
            movieImage.attr("src", results[i].images.fixed_height_still.url)
            movieImage.attr("data-still",results[i].images.fixed_height_still.url)
            movieImage.attr("data-move",results[i].images.fixed_height.url)
            giphyDiv.append(rating)
            giphyDiv.append(movieImage)
            $("#giphyOutput").append(giphyDiv)
        }
      });
  });