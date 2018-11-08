let songs = ["let it go", "mmmbop", "hey ya", "lika a virgin"];
let guesses = ["like a virgin", "let it go", "mmmbop", "hey ya"];
let languages = ["dothraki"];
let user = "Captain Awesome";
//let lyrics;
let number = 1;
let wins = 0;
let losses = 0;
let guess = 0;
let count = 0;
//let translation;
let song = songs[2];
var language = languages[0];

function songPull(song, language) {
    //api for songPull here
    // variable to hold url to bypass CORS restrictions
    var corsBypass = "https://cors-escape.herokuapp.com/"
    // URL for to get music lyrics from selected song
    var queryURL = `${corsBypass}https://api.musixmatch.com/ws/1.1/track.search?q_track=${song}&apikey=19235e8ed115f81044447a46c258f431`;
    console.log(song);

    // ajax call to get song lyrics
    $.ajax({
        url: queryURL,
        method: "GET"
        // first callback gets the song id to be passed into second ajax call
    }).then(function (response) {
        // console.log(queryURL);
        // response returns as a string -- json.parse changes into an object
        var JSONresponse = JSON.parse(response);
        //console.log(JSONresponse.message.body.track_list[0].track.track_id);
        // trackid number that will be passed into second ajax call
        var trackId = JSONresponse.message.body.track_list[0].track.track_id;

        // second ajax callback takes track id to get lyrics for chosen song
        $.ajax({
            url: `${corsBypass}https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=19235e8ed115f81044447a46c258f431`,
            method: "GET"
        }).then(function (secondResponse) {
            // response returns as a string -- json.parse changes into an object
            var trackIdResponse = JSON.parse(secondResponse);
            // response returns lyrics to pe passed into translation function
            var lyrics = trackIdResponse.message.body.lyrics.lyrics_body;
            console.log(lyrics);

            $.ajax({
                url: `https://api.funtranslations.com/translate/${language}.json?text=${lyrics}&api_key=JU188G9Hg1LzLKqX6gSA6QeF`,
                method: "Get"
            }).then(function (lyricResponse) {
                // console.log(lyricResponse)
                console.log(lyricResponse.contents.translated)
                translatedLyrics = lyricResponse.contents.translated

                // used substing method to get all of the lyrics up the first * which indicates non commercial use only
                $("#translLyrics").html(`<p>${translatedLyrics.substring(0, translatedLyrics.indexOf("*"))}</p>`);
            })
        })
    })

}

function displayGuesses() {
    for (var i = 0; i < songs.length; i++) {
        $(".guess" + [i]).text(guesses[i]);
    }
}

function displayWinLoss(number) {
    $(".questionNum").text(`Question ${number}`);
    $(".user").text(user);
    $(".corrAnswers").text("WINS: " + wins);
    $(".wrongAnswers").text("LOSSES: " + losses);
}

window.onload = function () {
    songPull(songs[0], language);
    //console.log(lyrics);
    //translation = songTranslate(lyrics, languages[0]);
    //console.log(translation);
    displayGuesses();
    //displayLyrics(translation);
    displayWinLoss(number);

}

$(".guess1").on("click", function (event) {
    console.log("guess made1");
    document.getElementById("changeling1").style.color = "black";
    document.getElementById("changeling1").style.backgroundColor = "pink";
    document.getElementById("changeling2").style.color = "black";
    document.getElementById("changeling2").style.backgroundColor = "white";
    document.getElementById("changeling3").style.color = "black";
    document.getElementById("changeling3").style.backgroundColor = "white";
    document.getElementById("changeling4").style.color = "black";
    document.getElementById("changeling4").style.backgroundColor = "white";
    //changeColor();
    guess = 1;

})

$(".guess2").on("click", function (event) {
    console.log("guess made2");
    document.getElementById("changeling1").style.color = "black";
    document.getElementById("changeling1").style.backgroundColor = "white";
    document.getElementById("changeling2").style.color = "black";
    document.getElementById("changeling2").style.backgroundColor = "pink";
    document.getElementById("changeling3").style.color = "black";
    document.getElementById("changeling3").style.backgroundColor = "white";
    document.getElementById("changeling4").style.color = "black";
    document.getElementById("changeling4").style.backgroundColor = "white";
    guess = 2;
    //changeColor(); // change color of guess as a "highlight"
})

$(".guess3").on("click", function (event) {
    console.log("guess made3");
    document.getElementById("changeling1").style.color = "black";
    document.getElementById("changeling1").style.backgroundColor = "white";
    document.getElementById("changeling2").style.color = "black";
    document.getElementById("changeling2").style.backgroundColor = "white";
    document.getElementById("changeling3").style.color = "black";
    document.getElementById("changeling3").style.backgroundColor = "pink";
    document.getElementById("changeling4").style.color = "black";
    document.getElementById("changeling4").style.backgroundColor = "white";
    guess = 3;
    //changeColor(); // change color of guess as a "highlight"
})

$(".guess4").on("click", function (event) {
    console.log("guess made4");
    document.getElementById("changeling1").style.color = "black";
    document.getElementById("changeling1").style.backgroundColor = "white";
    document.getElementById("changeling2").style.color = "black";
    document.getElementById("changeling2").style.backgroundColor = "white";
    document.getElementById("changeling3").style.color = "black";
    document.getElementById("changeling3").style.backgroundColor = "white";
    document.getElementById("changeling4").style.color = "black";
    document.getElementById("changeling4").style.backgroundColor = "pink";
    guess = 4;
    //changeColor(); // change color of guess as a "highlight"
})

$("#game-submit").on("click", function (event) { //nested on.click 's. Not sure if will work. 
    // prevents user from hitting return to trigger event
    event.preventDefault();

    console.log("submit made");
    if (number === guess) {
        wins = wins + 1;
        count = count + 1;
        number = number + 1;
    } else {
        losses = losses + 1;
        count = count + 1;
        number = number + 1;
    }
    songPull(songs[count], language);
    //translation = songTranslate(lyrics, languages[0]);
    displayGuesses();
    //displayLyrics(translation);
    displayWinLoss(number);

})

// on click function to translate user input for artist and song
$("#translate-button").on("click", function (event) {
    // prevents user from hitting return to trigger event
    event.preventDefault();

    // variables to hold user input to be passed into ajax call
    var userArtist = $("#user-artist").val().trim();
    var userSong = $("#user-song").val().trim();

    // variable to hold url to bypass CORS restrictions
    var corsBypass = "https://cors-escape.herokuapp.com/"
    // URL to get music lyrics from user inputs for artist and song
    var queryURL = `${corsBypass}https://api.musixmatch.com/ws/1.1/track.search?q_artist=${userArtist}&q_track=${userSong}&apikey=19235e8ed115f81044447a46c258f431`;

    // ajax call to get song lyrics
    $.ajax({
        url: queryURL,
        method: "GET"
        // first callback gets the song id to be passed into second ajax call
    }).then(function (response) {
        // console.log(queryURL);
        // response returns as a string -- json.parse changes into an object
        var JSONresponse = JSON.parse(response);
        //console.log(JSONresponse.message.body.track_list[0].track.track_id);
        // trackid number that will be passed into second ajax call
        var trackId = JSONresponse.message.body.track_list[0].track.track_id;

        // second ajax callback takes track id to get lyrics for chosen song
        $.ajax({
            url: `${corsBypass}https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=19235e8ed115f81044447a46c258f431`,
            method: "GET"
        }).then(function (secondResponse) {
            // response returns as a string -- json.parse changes into an object
            var trackIdResponse = JSON.parse(secondResponse);
            // response returns lyrics to pe passed into translation function
            var lyrics = trackIdResponse.message.body.lyrics.lyrics_body;
            console.log(lyrics);

            $.ajax({
                url: `https://api.funtranslations.com/translate/${language}.json?text=${lyrics}&api_key=JU188G9Hg1LzLKqX6gSA6QeF`,
                method: "Get"
            }).then(function (lyricResponse) {
                // console.log(lyricResponse.contents.translated)
                translatedLyrics = lyricResponse.contents.translated

                // used substing method to get all of the lyrics up the first * which indicates non commercial use only
                $("#user-translated-lyrics").html(`
                    <h5>${userArtist}'s ${userSong}</h5>
                    <h6>in Dothraki:</h6>
                    <p>${translatedLyrics.substring(0, translatedLyrics.indexOf("*"))}</p>`
                );

                // Clears all of the text-boxes
                $("#user-artist").val("");
                $("#user-song").val("");
            })
        })
    })


})