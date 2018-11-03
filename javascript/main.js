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
var song ="hey ya"

function songPull(song) {
    //api for songPull here
    var corsBypass = "https://cors-escape.herokuapp.com/"
    var queryURL = `${corsBypass}http://api.musixmatch.com/ws/1.1/track.search?q_track=${song}&apikey=19235e8ed115f81044447a46c258f431`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(queryURL);
        var JSONresponse = JSON.parse(response);
        console.log(JSONresponse.message.body.track_list[0].track.track_id);
        var trackId = JSONresponse.message.body.track_list[0].track.track_id;

        $.ajax({
            url: `${corsBypass}http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=19235e8ed115f81044447a46c258f431`,
            method: "GET"
        }).then(function (secondResponse) {
            var trackIdResponse = JSON.parse(secondResponse);
            var lyrics = trackIdResponse.message.body.lyrics.lyrics_body
            console.log(lyrics)
        })
    })
    return lyrics
}

function songTranslate(lyrics, language) {
    let translation
    //api for translating song here
    return translation

}

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
