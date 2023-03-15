# Hangman

JavaScrip Final Project - Hangman game website.

> In this document, I explain the website with a small description, resources used and improvements for the hangman game that I created. The document is divided in three sections.
> 

🕹️  **Project link:** [https://celebrated-cuchufli-5ef825.netlify.app/](https://celebrated-cuchufli-5ef825.netlify.app/)

# 1) Description of Hangman game.

This is the description of my final project, a culmination of all the knowledge in HTLL, JavaScrip and CSS. This project uses an API and the hangman part is done with graphics. The goal of my project is to crate a fun and interactive game for users. 

The game is is very simple. When the page loads, the user needs the guess a five letter word having ten lives in total. The word is secret (not visible to the user) and it's retrieved via an API that returns a five letter word (resource in “resources used”). I decided to choose a five letter word so that it is easier for the user, because if the word has a random number of letters, the API could retrieve a very long word and the user won't always have the same odds to guess the word.

Once the page has loaded, the user can start guessing letters by pressing on the letter buttons. When a letter is pressed, if the letter is in the secret word the letter appears in its corresponding place, otherwise the life counter goes down and the hangman graphic changes.

There are two possible scenarios when the users finished the game. The user can guess the word in without loosing all of their lives. In this case, the game becomes disabled so that they aren’t able to keep playing and a message appears on screen that says “YOU WON”. Under this message, there is a button that says “play again”. If the user presses this button, the page reloads an it's able to play a new game with a new word. The other possible scenario, is that the user looses all their lives without guessing the word. In this case, The same thing happens as when the user wins, but in this case the message says “GAME OVER” and it also shows the secret word that the user wasn't able to guess.

# 2) Resources used.

In order to create this game, the most important part is to retrieve the secret word that the user needs to guess. To do so, I used a random word API that returns a random five letter word. The API that I used it’s open and this is the website with all the documentation:

[API Documentation](http://random-word-api.herokuapp.com/home)

# 3) Improvements.

For an improved 2.0 version I have a couple ideas:

- Make it visible and useful for mobile devices. Right now the website doesn't look good when loaded on mobile devices.
- Ask for hints. Sometimes the words retrieved by the API are difficult to guess, so adding a hint/clue button could be helpful. A hint could either be block a letter that it's not in the word, give a letter that is in the word or give a hint on what the word is.
- User interface (UI). The current state of the website is super simple only having a colors for the buttons (letters and “play again”), so an improvement can be made on the interface to make it more appealing for the user.
