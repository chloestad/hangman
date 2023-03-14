// // ---------- USE AN API AND FETCH IT RO RECIEVE A RANDOM 5 LETTER WORD ----------

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
    // document.getElementById("secret").textContent = secret_word;
    console.log(`The secret word is: ${secret_word}`);
    return secret_word;
  } catch (error) {
    console.error(error);
  }
}

//--------------------------------------------------------------------------------------
function showGameOverMessage(message) {
  // Create a new div element with the "game-over" class
  const gameOverDiv = document.createElement('div');
  gameOverDiv.classList.add('game-over');

  // Add the message to the div with the "message" class
  const gameOverMsg = document.createElement('div');
  gameOverMsg.classList.add('message');
  gameOverMsg.textContent = message;
  gameOverDiv.appendChild(gameOverMsg);

  // Create a button element with the "reload" class
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
//--------------------------------------------------------------------------------------
let stage = 0;

function updateHangmanImage() {
  const hangmanImage = document.getElementById('hangman-image');
  const imagePath = `photos/stage_${stage}.png`;
  hangmanImage.setAttribute('src', imagePath);
}

//--------------------------------------------------------------------------------------
// When I have the word to guess (secret_word) I create a button for
// every letter in the alphabet. When a letter is clicked is becomes disabled
// and I also check if it's in the secret word.
getSecretWord().then(secret_word => {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", 
                "J", "K", "L", "M", "N", "O", "P", "Q", "R", 
                "S", "T", "U", "V", "W", "X", "Y", "Z"]

  const container = document.getElementById("button-container");

  let lives = 10; // The number of lives
  const livesElement = document.getElementById("lives");
  livesElement.textContent += ` ${lives}`;

  let guessedLetters = [];
  const secretWordElement = document.getElementById("secret");

  for (let i = 0; i < alphabet.length; i++){
    
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = alphabet[i];

    // Add an event listener to the button
    button.addEventListener("click", function() {
      // Disable the button when it is clicked
      button.disabled = true;

      // Check if the letter of the button is in secret_word
      if (secret_word.includes(button.textContent.toLowerCase())) {
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

        // Check if they match (word has been guessed).
        if (secretWordElement.textContent === secret_word.toUpperCase()) {
          console.log("All letters guessed!");
          showGameOverMessage('YOU WON!');
        }

      }
      
      else {
        console.log(`The letter '${button.textContent}' is not in the secret word.`);
        lives -= 1;
        livesElement.textContent = `Life counter: ${lives}`;
        stage++;
        updateHangmanImage();

      }

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
