$(document).ready(function () {

    var words = ["horse", "revolver", "lasso", "cowboy", "cow", "gunslinger", "saloon", "coyote", "rifle", "saddle", "shotgun", "cactus", "whiskey", "sheriff", "texas", "spurs"];
    var guessLeft = 12;
    var winCount = 0;
    var wrongGuess = [];
    var hiddenWord = [];
    var wrongGuessText = document.getElementById("wrongguess-text");
    var winCountText = document.getElementById("wincount-text");
    var hiddenWordText = document.getElementById("hiddenword-text");
    var guessesLeftText = document.getElementById("guessesleft-text");
    var chosenWord = words[Math.floor(Math.random() * words.length)];
    var themeMusic = document.createElement("audio");
    themeMusic.setAttribute("src", "assets/sounds/Cowboy_Theme.mp3");

    $(".musicbtn").on("click", function () {
        themeMusic.play();
    });
    $(".pausebtn").on("click", function () {
        themeMusic.pause();
    });

    //Changes the first initial chosen word into blank spaces
    for (i = 0; i < chosenWord.length; i++) {
        hiddenWord.push("_");
        hiddenWordText.textContent = hiddenWord.join(" ");
    }

    // resetWord()

    //This function activates once a word has been completed and picks a new word/sets blank spaces
    var resetWord = function () {
        chosenWord = words[Math.floor(Math.random() * words.length)];
        guessLeft = 12;
        guessesLeftText.textContent = "Guesses Left: " + guessLeft;
        hiddenWord = [];
        wrongGuess = [];
        wrongGuessText.textContent = "";
        for (i = 0; i < chosenWord.length; i++) {
            hiddenWord.push("_");
            hiddenWordText.textContent = hiddenWord.join(" ");
        }
    };

    document.onkeyup = function (event) {
        var userGuess = event.key;

        if (event.keyCode >= 65 && event.keyCode <= 90 && guessLeft >= 1) {

            //if the player guesses the letter correctly
            if (chosenWord.indexOf(userGuess) >= 0) {

                for (var i = 0; i < chosenWord.length; i++) {
                    if (chosenWord[i] == userGuess) {
                        hiddenWord[i] = userGuess;
                        hiddenWordText.textContent = hiddenWord.join(" ");
                    }
                }
            }
            //if the user input has already been guessed, then do nothing
            else if (wrongGuess.includes(userGuess)) {
            }
            //if the user input is wrong, push the guess to to the wrong letter array and take a guess away
            else {
                guessLeft = guessLeft - 1;
                wrongGuess.push(userGuess);
                wrongGuessText.textContent = wrongGuess.join(" ");
                guessesLeftText.textContent = "Guesses Left: " + guessLeft;

            }

            // Checks to see if a word has been completed
            if (hiddenWord.includes("_")) {
                hasUserWon = false;
            }

            else {
                winCount++;
                winCountText.textContent = "Words guessed correctly in a row: " + winCount;
                hasUserWon = true;
                resetWord();
                wrongGuessText.textContent = "Nice! Next word!";
            }
        }
        else {
            alert("You lost!");
            resetWord();
            winCount = 0;
            winCountText.textContent = "Words guessed correctly in a row: " + winCount;
            wrongGuessText.textContent = "Letters Guessed";
        }
    }
});