// ------------- USE AN API AND FETCH IT TO RECIEVE A RANDOM 5 LETTER WORD -------------

// I save the API that returns a 5 letter word as a constant variable
const API_URL = "https://random-word-api.herokuapp.com/word?length=5";

// I use an async funtion to fetch the word to guess
async function getSecretWord() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const secret_word = data[0];
    const secret_word_with_underscores = secret_word.replace(/./g, "_ ");
    document.getElementById("secret").textContent = secret_word_with_underscores;
    // The line below is commented, but if we want to see the secret word in console
    // or cheat ;) we need to uncomment it.
    // console.log(`The secret word is: ${secret_word}`);
    return secret_word;
  } catch (error) {
    console.error(error);
  }
}

//---------------- FUNCTION THAT SHOWS A MESSAGE WHEN THE GAME IS FINISHED ----------------
// The function recieves a message parameter. This can be the game over or you won message.

function showGameOverMessage(message) {
  // Create a new div element with the "game-over" class
  const gameOverDiv = document.createElement('div');
  gameOverDiv.classList.add('game-over');

  // Add the message to the div with the "message" class
  const gameOverMsg = document.createElement('div');
  gameOverMsg.classList.add('message');
  gameOverMsg.textContent = message;
  gameOverDiv.appendChild(gameOverMsg);

  // Create a button element to play again with the "reload" class
  const reloadBtn = document.createElement('button');
  reloadBtn.classList.add('reload');
  reloadBtn.innerHTML = 'Play again';

  // Add a click event listener to the button
  reloadBtn.addEventListener('click', function(){
    location.reload();
  });

  // Append the button to the div
  gameOverDiv.appendChild(reloadBtn);

  // Append the div to the body of the page
  document.body.appendChild(gameOverDiv);
}
//----------------------- FUNCTION TO UPDATE THE HANGMAN GRAPHIC -----------------------

// Create a variable to store the stage. It starts at 0 when the game hasn't started.
let stage = 0;

// Function to update the graphic. Called when the letter guessed by the user is wrong.
function updateHangmanImage() {
  const hangmanImage = document.getElementById('hangman-image');
  const imagePath = `photos/stage_${stage}.png`;
  hangmanImage.setAttribute('src', imagePath);
}

//---------------------- RETRIEVEN THE WORD AND INTERACTION WITH USER ---------------------- 
// When I have the word to guess (secret_word retrieved from API) I create a button for
// every letter in the alphabet (inside button-container). When a letter is clicked it 
// becomes disabled so that it can't be pressed again. After the letter is clicked, we
// need to check if the letter is in the word. If it is, if appears in the corresponting spot,
// if it's not, the user looses a life and the graphic is updated.


// Function to create letter buttons.
getSecretWord().then(secret_word => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", 
                "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
                "S", "T", "U", "V", "W", "X", "Y", "Z"]

  const container = document.getElementById("button-container");

  let lives = 10; // The number of lives
  const livesElement = document.getElementById("lives");
  livesElement.textContent += ` ${lives}`;

  let guessedLetters = []; // Array that will store letters guessed
  const secretWordElement = document.getElementById("secret");

  // Iterate through the alphabet array te create a button for every letter.
  for (let i = 0; i < alphabet.length; i++){
    
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = alphabet[i];

    // Add an event listener to the button
    button.addEventListener("click", function() {
      // Disable the button when it is clicked
      button.disabled = true;

      // Check if the letter guessed is in secret_word
      if (secret_word.includes(button.textContent.toLowerCase())) {
        // Print the console if the letter is in the word.
        console.log(`The letter '${button.textContent}' is in the secret word!`);
        guessedLetters.push(button.textContent.toLowerCase());
        let newSecretWord = "";
        for (let i = 0; i < secret_word.length; i++){
          if (guessedLetters.includes(secret_word[i])){
            newSecretWord += secret_word[i].toUpperCase();
          }
          else{
            newSecretWord += "_ ";
          }
        }

        secretWordElement.textContent = newSecretWord;

        // Check if they match (word has been guessed). Game finishes.
        if (secretWordElement.textContent === secret_word.toUpperCase()) {
          console.log("All letters guessed!");
          showGameOverMessage('YOU WON!');
        }

      }
      
      else {
        // Print the if the letter is NOT in the secret word.
        console.log(`The letter '${button.textContent}' is not in the secret word.`);
        
        // Update life counter.
        lives -= 1;
        livesElement.textContent = `Life counter: ${lives}`;
        stage++;
        updateHangmanImage();

      }

      // If the user has 0 lives it means they lost.
      if (lives <= 0){
        console.log("GAME OVER :(");
        showGameOverMessage('GAME OVER! The word was ' + secret_word);

        // Add the secret word to the div with the "message" class
        const secretWordMsg = document.createElement('div');
        secretWordMsg.classList.add('message');
        secretWordMsg.textContent = `The secret word was: ${secret_word}`;
        gameOverDiv.appendChild(secretWordMsg);
      }
    });
    container.appendChild(button);
  }
  
});
// -------------------------------------------------------------------------------------------