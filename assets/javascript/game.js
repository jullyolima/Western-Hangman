$(document).ready(function () {

    var words = ["horse", "revolver", "lasso", "cowboy", "cow", "gunslinger", "saloon"];
    var guessLeft = 12;
    var winCount = 0;
    var wrongGuess = [];
    var hiddenWord = [];
    var wrongGuessText = document.getElementById("wrongguess-text");
    var winCountText = document.getElementById("wincount-text");
    var hiddenWordText = document.getElementById("hiddenword-text");
    var guessesLeftText = document.getElementById("guessesleft-text");
    var chosenWord = words[Math.floor(Math.random() * words.length)];

    var hasUserWon = false;

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

        console.log("Hidden Word:" + hiddenWord);
        console.log("New Word:" + chosenWord);
    };


    document.onkeyup = function (event) {
        var userGuess = event.key;
        console.log("Chosen Word: " + chosenWord);
        console.log("User Guess: " + userGuess);
        console.log("Index of chosen word: " + chosenWord.indexOf(userGuess));

        
        if(event.keyCode >= 65 && event.keyCode <= 90){

        //if the player guesses the letter correctly
        if (chosenWord.indexOf(userGuess) >= 0) {
            console.log("correct");
            console.log("Guesses Left: " + guessLeft);
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
            console.log("Guesses Left: " + guessLeft);
            console.log("wrong");
        }

        // Checks to see if a word has been completed
        if (hiddenWord.includes("_")) {
            hasUserWon = false;
            console.log(hiddenWord[i]);

        }
        else {
            winCount++;
            winCountText.textContent = "Words Guessed Correctly: " + winCount;
            hasUserWon = true;
            resetWord();
            alert("you win!");
        }
        console.log(hasUserWon);
        //}

    }
    }
});