// array that stores the colors of the 4 buttons
let buttonColors = ["red", "blue", "green", "yellow"];

// array that stores the game's pattern (sequence of colors)
let gamePattern = [];

// array that stores the user's pattern (sequence of colors)
let userPattern = [];

// keeps track of the current level of the game
let gameLevel = 0;

// game title text
let levelText = $("#level-title");

let gameOverText = "Game Over, Press Any Key to Restart";

let startText = "Press A Key to Start";

// global variable; helps to see if the user's pattern is the
// same as the game's pattern
let j = 0;

function nextSequence() {
  // increment the gameLevel
  gameLevel++;
  // Update h1 text with the correct game level
  $("#level-title").text(`Level ${gameLevel}`);

  // Inside the new function generate a new random number between
  // 0 and 3, and store it in a variable called
  let randomNumber = Math.random();
  randomNumber = randomNumber * 3;
  randomNumber = Math.floor(randomNumber) + 1;

  // create a new variable that stores a randomly generated color
  let randomChosenColor = buttonColors[randomNumber];

  // animate the button with the random color that was chosen
  animateButton(randomChosenColor);

  // play the sound for the button with the random color that was chosen
  playSound(randomChosenColor);

  // adds the randomly selected color to the end of the gamePattern array
  gamePattern.push(randomChosenColor);
  console.log("gamePattern = ", gamePattern);
}

function isUserCorrect() {
  let gameLength = gamePattern.length;
  // if the userPattern array is the same as the gamePattern array, return true
  console.log(
    `isUserCorrect(): gamePattern = ${gamePattern}, userPattern = ${userPattern}`
  );
  if (userPattern.length !== gameLength) {
    return false;
  } else {
    // both arrays are the same length, so there is a chance that the user got the sequence correct
    for (let y = 0; y < gameLength; y++) {
      if (userPattern[y] !== gamePattern[i]) {
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
    console.log("levelText = ", $("#level-title"));

    // check to see if button was clicked after the game ended
    // OR before the first game has started
    if (
      $("#level-title").text() === gameOverText ||
      $("#level-title").text() === startText
    ) {
      // animate the body's background
      animateBackground();
      // play bad sound
      playSound("black");
    }

    // button has been clicked by the user
    let currBtn = this;

    // button color is stored as its id
    let col = currBtn.id;
    console.log("currBtn = ", currBtn);
    console.log("currBtn.id = ", currBtn.id);

    // animate the button once it has been clicked
    animateButton(col);

    // play the sound for the corresponding button once it has been clicked
    playSound(col);

    // compare the userPattern array to the gamePatter array; // needs to
    // check against gamePattern array after each time a button is clicked
    if (gamePattern[j] === col) {
      // add the color of the button to the user array
      userPattern.push(col);
      j++;
      console.log(
        `gamePattern = ${gamePattern}\nuserPattern is now = ${userPattern}`
      );

      // both arrays are equal lengths and the most recent user input was correct;
      // this means that the user's values are equal to the game's values.
      if (userPattern.length === gamePattern.length) {
        console.log("User is correct. Move to the next level.");
        // call nextSequence because the user is correct but first, we must reset
        // the values of j & the user array
        j = 0;
        userPattern = [];
        // add a 1 second delay so the user can clearly see what the next color is
        setTimeout(function () {
          console.log("Delay for better user experience.");
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("game over!");
      // game over; the user's input did not match up with sequence
      // animate the body's background
      animateBackground();
      // play appropiate sound to indicate that the user is wrong
      playSound("black");

      // set j back to 0
      j = 0;

      // set the user & game's patterns back to empty arrays because the game is now over
      userPattern = [];
      gamePattern = [];

      // set gameLevel back to 0
      gameLevel = 0;

      // change text of h1 tag with id = 'level-title' to show the
      // user that the game is over
      $("#level-title").text(gameOverText);
      // do nothing, user must press a key for a new game to be started
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
    }, 250);
  }
}

// makes the background flash to red when the user does something wrong
function animateBackground() {
  // flash the body's background red
  $("body").css("background-color", "red");

  // wait 0.25 seconds
  setTimeout(function () {
    // set the body's background to its original color
    $("body").css("background-color", "#011F3F");
  }, 250);
}

// plays sound based on the color of the button that was clicked
function playSound(color) {
  let audio = new Audio();
  switch (color) {
    case "green":
      // play the green sound
      audio.src = "./sounds/green.mp3";
      audio.play();
      break;

    case "red":
      // play the green sound
      audio.src = "./sounds/red.mp3";
      audio.play();
      break;

    case "yellow":
      // play the green sound
      audio.src = "./sounds/yellow.mp3";
      audio.play();
      break;

    case "blue":
      // play the green sound
      audio.src = "./sounds/blue.mp3";
      audio.play();
      break;

    case "black":
      // game over, play the 'wrong' sound
      audio.src = "./sounds/wrong.mp3";
      audio.play();
      break;

    default:
      console.log(
        "playSound(); default option; code should not reach this point so there must be a bug."
      );
  }
}

// this function executes when a key is pressed
addEventListener("keydown", function () {
  // start a new game when a key is pressed AND the gameLevel = 0;
  if (gameLevel === 0) {
    nextSequence();
  }
});
