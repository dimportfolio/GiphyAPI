var movies = [
"grave-of-the-fireflies",
"my-neighbor-totoro",
"kiki's-delivery-service",
"princess-mononoke",
"spirited-away",
"howl's-moving-castle",
"ponyo",
"arrietty",
"the-wind-rises"
]

var userMovies = [];

$("#search").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchButton").click();
    }
});

function storeMovie() {
    var store = $("#search").val();
    userMovies.push(store);
    console.log(userMovies);
    generateUserSearch();
}

function generateUserSearch(){
    $("#buttonContainer2").html("");
    var buttonContainer = $("#buttonContainer2");
    for (i=0;i<userMovies.length;i++){
    var button = $("<button>");
    button.attr("movie-name", userMovies[i]);
    button.addClass("movies");
    button.text(userMovies[i]);
    buttonContainer.append(button);
    }
}

function generateButtons(){
    var buttonContainer = $("#buttonContainer");
    for (i=0;i<movies.length;i++){
    var button = $("<button>");
    button.attr("movie-name", movies[i]);
    button.addClass("movies");
    button.text(movies[i]);
    buttonContainer.append(button);
    }
}
generateButtons();

function displayGifs(){
    var movieName = $(this).attr("movie-name");
    console.log(movieName);
    var gifContainer = $("#gifContainer");
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + movieName + '&api_key=LG5PK0oNKbzJIuCVIcJyQM8Hfcf6bESu&limit=10';
    gifContainer.empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (i=0;i<response.data.length;i++){
        var blockContainer = $("<div>");
        var imgContainer = $("<img>");
        var rating = $("<p>");
        imgContainer.addClass("img-thumbnail img-fluid gif");
        imgContainer.attr("src", response.data[i].images.original_still.url);
        imgContainer.attr("data-attr", i);
        rating.text("Ratings: " + response.data[i].rating);
        blockContainer.addClass("col-lg-3");
        blockContainer.append(rating);
        blockContainer.append(imgContainer);
        gifContainer.append(blockContainer);
        }
    })
}

function animateGifs(){
    var source = $(this).attr("src");
    var words = source.split("/");
    console.log(words);
    if(words.indexOf("giphy_s.gif") != -1){
        words.splice(5,1,"giphy.gif");
        var joinArray = words.join("/");
        console.log("true" + joinArray);
        $(this).attr("src", joinArray);
    }
    else if(words.indexOf("giphy.gif") != -1){
        words.splice(5,1,"giphy_s.gif");
        var joinArray = words.join("/");
        console.log("false " + joinArray);
        $(this).attr("src", joinArray);
 
    }
}

$(document).on("click",".movies", displayGifs);

$(document).on("click",".gif", animateGifs);