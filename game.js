
// array that stores the colors of the 4 buttons
let buttonColors = ["red", "blue", "green", "yellow"];

// array that stores the game's pattern (sequence of colors)
let gamePattern = [];

function nextSequence() {
    // Inside the new function generate a new random number between 
    // 0 and 3, and store it in a variable called
    let randomNumber = Math.random();
    randomNumber = randomNumber * 3;
    randomNumber = Math.floor(randomNumber) + 1;

    // create a new variable that stores a randomly generated color
    let randomChosenColor = buttonColors[randomNumber];

    // adds the randomly selected color to the end of the gamePattern array
    gamePattern.push(randomChosenColor);
    console.log('gamePattern = ', gamePattern);


}