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

function songPull(song) {
    //api for songPull here
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
