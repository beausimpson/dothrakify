let songs = ["let it go", "mmmbop", "hey ya"];
let guesses = ["like a virgin", "let it go", "mmmbop", "hey ya"];
let languages = ["dothraki"];
let user = "Captain Awesome";
let lyrics;
let number = 1;
let wins = 0;
let losses = 0;
let guess = 0;
let count = 0;

// temporary variable to test songpull function -- will need to be removed
var song = "hey ya"

function songPull(song) {
    //api for songPull here
    // variable to hold url to bypass CORS restrictions
    var corsBypass = "https://cors-escape.herokuapp.com/"
    // URL for to get music lyrics from selected song
    var queryURL = `${corsBypass}http://api.musixmatch.com/ws/1.1/track.search?q_track=${song}&apikey=19235e8ed115f81044447a46c258f431`;

    // ajax call to get song lyrics
    $.ajax({
        url: queryURL,
        method: "GET"
        // first callback gets the song id to be passed into secojnd ajax call
    }).then(function (response) {
        // console.log(queryURL);
        // response returns as a string -- json.parse changes into an object
        var JSONresponse = JSON.parse(response);
        console.log(JSONresponse.message.body.track_list[0].track.track_id);
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
            var lyrics = trackIdResponse.message.body.lyrics.lyrics_body
            // console.log(lyrics)
        })
    })
    return lyrics
}

// temporary variable for language
var language = "dothraki"

// language parameter should only be needed if we want add feature of changing languages
function songTranslate(lyrics, language) {
    let translation
    //api for translating song here
    $.ajax({
        url: `https://api.funtranslations.com/translate/${language}.json?text=${lyrics}&api_key=JU188G9Hg1LzLKqX6gSA6QeF`,
        method: "Get"
    }).then(function (lyricResponse) {
        // console.log(lyricResponse)
        // response returns translated lyrics
        console.log(lyricResponse.contents.translated)
        // varaible to hold translated lyrics string
        translation = lyricResponse.contents.translated
    })
    return translation

}

// will need to limit the number of characters displayed from translated string to remove "not for commercial use" at the end of string
// possibly substring method
function displayLyrics(translation) {
    $(".translLyrics").text(translation);

}

function displayGuesses() {
    for (var i = 0; i < 4; i++) {
        $(".guess" + [i]).text(guesses[i]);
    }
}

function displayWinLoss(number) {
    $(".questionNum").text(number);
    $(".user").text(user);
    $(".corrAnswers").text("WINS: " + wins);
    $(".wrongAnswers").text("LOSSES: " + losses);
}

window.onload = function () {
    lyrics = songPull(songs[0]);
    translation = songTranslate(lyrics, languages[0]);
    displayGuesses();
    displayLyrics(translation);
    displayWinLoss(number);

}

$(".guess1").on("click", function (event) {
    console.log("guess made");
    // change color of guess as a "highlight"
    guess = 1;

})

$(".guess2").on("click", function (event) {
    console.log("guess made");
    guess = 2;
    // change color of guess as a "highlight"
})

$(".guess3").on("click", function (event) {
    console.log("guess made");
    guess = 3;
    // change color of guess as a "highlight"
})

$(".guess4").on("click", function (event) {
    console.log("guess made");
    guess = 4;
    // change color of guess as a "highlight"
})

$(".submit").on("click", function (event) { //nested on.click 's. Not sure if will work. 
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
    lyrics = songPull(songs[count]);
    translation = songTranslate(lyrics, languages[0]);
    displayGuesses();
    displayLyrics(translation);
    displayWinLoss(number);

})
