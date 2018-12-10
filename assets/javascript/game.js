$(document).ready(function () {

    var words = ["horse", "revolver", "lasso", "cowboy", "cow", "gunslinger", "saloon", "coyote", "rifle", "saddle", "shotgun", "cactus", "whiskey", "sheriff", "texas", "spurs"];
    var guessLeft, wrongGuess, hiddenWord, chosenWord;
    var winCount = 0;

    // elements
    var wrongGuessText = document.getElementById("wrongguess-text");
    var winCountText = document.getElementById("wincount-text");
    var hiddenWordText = document.getElementById("hiddenword-text");
    var guessesLeftText = document.getElementById("guessesleft-text");

    // audio
    var themeMusic = document.createElement("audio");
    themeMusic.setAttribute("src", "assets/sounds/Cowboy_Theme.mp3");
    $(".musicbtn").on("click", themeMusic.play)
    $(".pausebtn").on("click", themeMusic.pause)

    var resetGame = function () {
        // reset variables
        chosenWord = words[Math.floor(Math.random() * words.length)];
        guessLeft = 12;
        hiddenWord = [];
        wrongGuess = [];

        // create hidden word with underscores
        for (i = 0; i < chosenWord.length; i++) {
            hiddenWord.push("_");
        }

        // update html
        guessesLeftText.textContent = "Guesses Left: " + guessLeft;
        wrongGuessText.textContent = "";
        winCountText.textContent = "Words guessed correctly in a row: " + winCount; 
        hiddenWordText.textContent = hiddenWord.join(" ");
    };

    resetGame()

    document.onkeyup = function (event) {
        var userGuess = event.key;

        // only do stuff if it's a legal guess
        if (event.keyCode >= 65 && event.keyCode <= 90 && !wrongGuess.includes(userGuess)) {

            //if the player guesses the letter correctly
            if (chosenWord.indexOf(userGuess) >= 0) {

                // update hidden word
                for (var i = 0; i < chosenWord.length; i++) {
                    if (chosenWord[i] === userGuess) {
                        hiddenWord[i] = userGuess;
                    }
                }
                hiddenWordText.textContent = hiddenWord.join(" ");

                // check if they've won
                if (!hiddenWord.includes('_')) {
                    winCount++
                    resetGame();
                }
            }

            //if the user input is wrong, push the guess to to the wrong letter array and take a guess away
            else if (!wrongGuess.includes(userGuess)) {
                guessLeft--
                wrongGuess.push(userGuess);
                wrongGuessText.textContent = wrongGuess.join(" ");
                guessesLeftText.textContent = "Guesses Left: " + guessLeft;

                // check if they've lost
                if (guessLeft === 0) {                    
                    alert("You lost!");
                    winCount = 0;     
                    resetGame();        
                }
            }
        }
    }
});