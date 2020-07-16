# Unnamed Trivia Project
Description:
Just your simple untitled trivia game that features questions related to computer science and technology.

Approach:
* I like minimal design that isn't busy so I kept the HTML and CSS as light as possible. I sketched out on paper what I wanted the basic design to look like, as well as the logic flow of the questions.

How to Play:
* Users answer up to 10 random computer science and technology questions
* Simply load the web page and select the most correct answer displayed below the question.
* All questions are multiple choice
* Correct answers add 10 points to your score. Incorrect answers subtract 5 points. (So give it your best guess!)

List of Technologies Used:
* HTML
* CSS
* JavaScript
* Open Trivia db API
* fetch

Challenges:
* DOM manipulation can be a little bit tricky. The added complexity of working with an API also ate up more time to track down bugs in how I'd implemented the game design.

Unsolved problems and known bugs
* The questionsArray is being called before it's expected and duplicate answers are added to the game after the second question. Refactoring sections into helper functions should resolve this.
*  Some questions from the Trivia API have HTML characters and I believe encoding them as base64 and then running through atob() function to decode would render the text as expected. (might also be something that can be added to the URL).

Additional Enhancements:
* I'd like to add a game modal box that ask the player if they'd like to play a new game after answering all the questions. 
* I'd like to add a drop down so the player can select the number of questions and have that displayed
* Add game play countdown timer and time based scoring
* Better coloring and user feedback on scoring