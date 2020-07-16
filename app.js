// -----
// SCORE
// -----
let scoreTotal = 0;

// ---------------
// QUESTIONS ARRAY
// ---------------
let questionsArray = [];
let currentQuestion = 0;
let answersArray;
let currentAnswer = null;
let haveQuestions = false;

// Connect to trivia API for questions
// API information fetch
function getQuestions (){
	fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
	.then((res) => {
		return res.json();
	})
		.then((res) => {
			// SEND TO QUESTIONS ARRAY
			questionsArray = res.results;
			haveQuestions = true;
			handleStartReset();
		})
	}

function handleStartReset() {
	if (haveQuestions) {	
		// ---------------------------------
		// CREATE RANDOM ORDER FOR QUESTIONS
		// ---------------------------------
		// Button order including answer button
		let answersArrayCorrectIndex = Math.floor(Math.random() * 4);
	
		// --------------------------------
		// PUSH ALL ANSWERS TO ARRAY
		// --------------------------------
		// answerArray storing the incorrect answers
		answersArray = questionsArray[currentQuestion].incorrect_answers;
			
		// Selecting the correct answer and storing it to currentAnswer
		currentAnswer = questionsArray[currentQuestion].correct_answer;
	
		// Splicing in the correct currentAnswer using answersArrayCorrectIndex random
		// The correct answer is now randomly spliced into answersArray
		answersArray.splice(answersArrayCorrectIndex, 0, currentAnswer);
	
		// ------------------------------
		// DOM and question added to HTML
		// ------------------------------
		let questionTargetLocation = document.querySelector('.questions-box');

		// Confirm questionTargetLocation
		let createQuestionDisplayElement = document.createElement('p');
		createQuestionDisplayElement.setAttribute('class', 'question');

		// Confirm createQuestionDisplayElement
		questionTargetLocation.append(createQuestionDisplayElement);
		createQuestionDisplayElement.innerText = questionsArray[currentQuestion].question;
		
		// DOM create buttons and add innerTEXT for each
		let answerTargetLocation = document.querySelector('.js-answer-buttons');
			
		// ---------------------------------------------------
		// FOR LOOP TO ITERATE THROUGH INCORRECT ANSWERS ARRAY
		// ---------------------------------------------------
		for (let a = 0; a < answersArray.length; a++) {
		
			// --------------
			// CREATE BUTTONS
			// --------------
			let newButton = document.createElement('button');

			// Fill it with some content
			let newButtonText = document.createTextNode(`${answersArray[a]}`);
			newButton.appendChild(newButtonText);

			// Add text node to the newly created buttons
			answerTargetLocation.appendChild(newButton);

			// Set data-attribute that this is the correct answer to buttons
			newButton.setAttribute('data-id', a);
			newButton.setAttribute('class', 'answer');
			newButton.addEventListener('click', answersHandler);
		}
		
		// ------------------------
		// ANSWER BUTTONS FUNCTIONS
		// ------------------------
		function answersHandler(e) {
			// Assign data-id attribute
			let placeHolder = e.target.getAttribute('data-id');
			
			// Get player score display
			let playerScore = document.querySelector('.player-score');
			let buttons = document.getElementsByClassName('answer');
			for (let i = 0; i < buttons.length; i++){
				buttons[i].disabled = true;
			};
			
			// Logic test to see if the random that we generated matches our stored value and score
			if (answersArrayCorrectIndex == placeHolder) {
				scoreTotal += 10;
				playerScore.innerText = scoreTotal;
				e.target.style.color = 'green';
				e.target.style.fontWeight = "900";
			} else {
				scoreTotal -= 5;
				playerScore.innerText = scoreTotal;
				e.target.style.color = 'red';
				e.target.style.fontWeight = '900';
			}
			
			// Create Next Question Button to load additional questions
			let nextQuestionButton = document.createElement('button');
			let nextQuestionText = document.createTextNode('Next Question');
			nextQuestionButton.append(nextQuestionText);
			let nextQuestionControl = document.querySelector('.game-nav-controls');
			nextQuestionControl.append(nextQuestionButton);
			nextQuestionButton.setAttribute('class', 'next-button');
			// ---------------------
			// Next Question advance
			// ---------------------
			nextQuestionControl.addEventListener('click', clearGameBox);
			// INCREMENT QUESTION NUMBER
			currentQuestion++;
		}
		// ----------------------------------------
		// Clearing the Game Box for a new question
		// ----------------------------------------
		function clearGameBox() {
			let question = document.querySelector('.questions-box');
			let answerButtons = document.querySelector('.answer-buttons');
			let clearGameNavControls = document.querySelector('.game-nav-controls');
			question.innerHTML = '';
			answerButtons.innerHTML = '';
			clearGameNavControls.innerHTML = '';
			handleStartReset();
		}
	} else {
		getQuestions();
	};
};
handleStartReset();