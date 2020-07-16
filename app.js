// -----
// SCORE
// -----
let scoreTotal = 0;

// ---------------
// QUESTIONS ARRAY
// ---------------
let questionsArray = [];					// Empty questionsArray
let currentQuestion = 0;					// Incrementor for questionsArray
let answersArray = [];						// Array for all possible answers
let currentAnswer = null;					// The correct answer to the question				
let haveQuestions = false;					// Logic piece for if/else GAME Start

// --------------------------------------------------
// CONNECT TO Open Trivia API - API information fetch
// --------------------------------------------------
function getQuestions (){
	fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
	.then((res) => {						// Promise
		return res.json();					// json results
	})
		.then((res) => {					// Promise
			// -----------------------
			// SEND TO QUESTIONS ARRAY
			// -----------------------
			questionsArray = res.results;	// Question results from Trivia API
			haveQuestions = true;			// Logic if/else piece for GAME START
			handleStartReset();				// Invoke GAME START
		})
	}
// ----------
// GAME START
// ----------
function handleStartReset() {
	if (haveQuestions) {	// If haveQuestions is false goto else that invokes getQuestions
		// ---------------------------------
		// CREATE RANDOM ORDER FOR QUESTIONS
		// ---------------------------------
		let answersArrayCorrectIndex = Math.floor(Math.random() * 4);
	
		// --------------------------------
		// PUSH ALL ANSWERS TO ARRAY
		// --------------------------------
		// Take all incorrect answers and add to answersArray
		answersArray = questionsArray[currentQuestion].incorrect_answers;
			
		// Selecting the correct answer and storing it to currentAnswer
		currentAnswer = questionsArray[currentQuestion].correct_answer;
	
		// Splicing in the correct currentAnswer using answersArrayCorrectIndex random
		// The correct answer is now randomly spliced into answersArray
		answersArray.splice(answersArrayCorrectIndex, 0, currentAnswer);
	
		// ------------------------------
		// DOM and question added to HTML
		// ------------------------------
		// Target HTML class
		let questionTargetLocation = document.querySelector('.questions-box');
		// Create p element to hold questions
		let createQuestionDisplayElement = document.createElement('p');
		// Add additional class to element to help in targeting
		createQuestionDisplayElement.setAttribute('class', 'question');
		// Append created element to the question-box
		questionTargetLocation.append(createQuestionDisplayElement);
		// P element text from the current question
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
			// Fill it with answersArray content and iterate
			let newButtonText = document.createTextNode(`${answersArray[a]}`);
			newButton.appendChild(newButtonText);
			// Add text node to the newly created buttons
			answerTargetLocation.appendChild(newButton);
			// Set data-attribute that this is the correct answer to buttons
			newButton.setAttribute('data-id', a);
			// Set class of answer to each button for propagation 
			newButton.setAttribute('class', 'answer');
			// Click handler for newButton aka question answers
			newButton.addEventListener('click', answersHandler);
		}
		
		// ------------------------
		// ANSWER BUTTONS FUNCTIONS
		// ------------------------
		function answersHandler(e) {
			// Assign data-id attribute
			let placeHolder = e.target.getAttribute('data-id');
			// Target class item for player score
			let playerScore = document.querySelector('.player-score');
			// Get elements with the class of answers - prep to disable button after click
			let buttons = document.getElementsByClassName('answer');
			
			// ------------------------------------------
			// LOOP TO DISABLE ANSWER BUTTONS AFTER CLICK
			// ------------------------------------------
			for (let i = 0; i < buttons.length; i++){
				buttons[i].disabled = true;
			};
			
			// Logic to validate if button selected matched the random index number assigned to our correct answer
			if (answersArrayCorrectIndex == placeHolder) {	// Match comparison
				scoreTotal += 10;							// Scoring
				playerScore.innerText = scoreTotal;			// Update scoring
				e.target.style.color = 'green';				// Correct style selection color
				e.target.style.fontWeight = "900";			// Increasing font boldness
			} else {										// If not a match
				scoreTotal -= 5;							// Subtract points
				playerScore.innerText = scoreTotal;			// Update scoring
				e.target.style.color = 'red';				// Incorrect style selection color
				e.target.style.fontWeight = '900';			// Increasing font boldness
			}
			
			// Create Next Question Button to load additional questions
			let nextQuestionButton = document.createElement('button');
			// Create TextNode for button
			let nextQuestionText = document.createTextNode('Next Question');
			// Append TextNode to nextQuestionButton
			nextQuestionButton.append(nextQuestionText);
			// Target class item to place button
			let nextQuestionControl = document.querySelector('.game-nav-controls');
			// Append to button
			nextQuestionControl.append(nextQuestionButton);
			// Add class to button
			nextQuestionButton.setAttribute('class', 'next-button');
			
			// -----------------------------------
			// NEXT QUESTION ADVANCE CLICK HANDLER
			// -----------------------------------
			nextQuestionControl.addEventListener('click', clearGameBox);
			
			// -------------------------
			// INCREMENT QUESTION NUMBER
			// -------------------------
			currentQuestion++;
		}
		// ----------------------------------------
		// CLEARING THE GAME BOX FOR A NEW QUESTION
		// ----------------------------------------
		function clearGameBox() {
			// Target different classes so we can clear them
			let question = document.querySelector('.questions-box');
			let answerButtons = document.querySelector('.answer-buttons');
			let clearGameNavControls = document.querySelector('.game-nav-controls');
			// Clear the previously targeted elements and replace with empty strings
			question.innerHTML = '';
			answerButtons.innerHTML = '';
			clearGameNavControls.innerHTML = '';
			handleStartReset();							// Invoke GAME START
		}
	} else {
		getQuestions();									// exit if loop - API fetch
	};
};
handleStartReset();	// Runs after loading JS then loops through if / else to before calling API