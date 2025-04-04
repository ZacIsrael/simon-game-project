// array that stores the colors of the 4 buttons
let buttonColors = ["red", "blue", "green", "yellow"];

// array that stores the game's pattern (sequence of colors)
let gamePattern = [];

// array that stores the user's pattern (sequence of colors)
let userPattern = [];

// keeps track of the current level of the game
let gameLevel = 1;

// game title text
let levelText = $("#level-title");

function nextSequence() {
  // Update h1 text with the correct game level
  levelText.text(`Level ${gameLevel}`);

  // Inside the new function generate a new random number between
  // 0 and 3, and store it in a variable called
  let randomNumber = Math.random();
  randomNumber = randomNumber * 3;
  randomNumber = Math.floor(randomNumber) + 1;

  // create a new variable that stores a randomly generated color
  let randomChosenColor = buttonColors[randomNumber];

  // animate the button with the random color that was chosen
  animateButton(randomChosenColor);

  // adds the randomly selected color to the end of the gamePattern array
  gamePattern.push(randomChosenColor);
  console.log("gamePattern = ", gamePattern);
}

function isUserCorrect() {
  let gameLength = gamePattern.length;
  // if the userPattern array is the same as the gamePattern array, return true
  if (userPattern.length !== gameLength) {
    return false;
  } else {
    // both arrays are the same length, so there is a chance that the user got the sequence correct
    for (let i = 0; i < gameLength; i++) {
      if (userPattern[i] !== gamePattern[i]) {
        // element at the i index in each array is not the same; return false; user is incorrect
        return false;
      }
    }
    // both arrays are equal; return true
    return true;
  }
}

// retrieves the 4 buttons
let colorButtons = $(".btn");

// iterate through the 4 buttons
for (let i = 0; i < colorButtons.length; i++) {
  colorButtons[i].addEventListener("click", function () {
    // button has been clicked by the user
    let currBtn = this;

    // button color is stored as its id
    let col = currBtn.id;
    console.log("currBtn = ", currBtn);
    console.log("currBtn.id = ", currBtn.id);

    // animate the button once it has been clicked 
    animateButton(col);

    // add the color of the button to the user array
    userPattern.push(col);

    // compare the userPattern array to the gamePatter array
    let result = isUserCorrect();
    if (result) {
      // continue on with the game, up date level in h1 tag with id = 'level-title'
      // increment the gameLevel
      gameLevel++;
      console.log("continue playing");
      // generate the next sequence
      nextSequence();
    } else {
      // end the game, change text of h1 tag with id = 'level-title'
      levelText.text("Game Over, Press Any Key to Restart");
      // reset the gameLevel back to 1
      gameLevel = 1;
      console.log("game over");
    }
  });
}

// animates the button with the given color
function animateButton(color) {
  // retrieve the button that was clicked
  // (each of the buttons have an id with its color)
  let btnClicked = $(`#${color}`);
  console.log("Animating ", btnClicked);

  if (btnClicked === null) {
    // this will never happen based on how I have implemnted the code
    // but it's best practice to always to a null check.
    console.log(
      "Invalid button. There is a bug in the code. This function should only be called with a valid button"
    );
  } else {
    // add class (in styles.css) to the button
    btnClicked.addClass("pressed");

    // wait 0.25 seconds
    setTimeout(function () {
      // then remove the "pressed" class so that the button goes back to its original state
      btnClicked.removeClass("pressed");
    }, 25);
  }
}
