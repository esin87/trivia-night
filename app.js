// -----
// SCORE
// -----
let scoreTotal = 0;

// ---------------
// QUESTIONS ARRAY
// ---------------
let questionsArray = []; // Empty questionsArray
let haveQuestions = false; // Logic piece for if/else GAME Start
let currentQuestionIndex = 0; //track which question we're on

//instead of creating unnecessary answers/incorrect answers arrays and variables, all of this can be handled dynamically per question

// --------------------------------------------------
// CONNECT TO Open Trivia API - API information fetch
// --------------------------------------------------
function getQuestions() {
	fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
		.then((res) => {
			// Promise
			return res.json(); // json results
		})
		.then((res) => {
			// Promise
			// -----------------------
			// SEND TO QUESTIONS ARRAY
			// -----------------------
			questionsArray = res.results.sort(() => 0.5 - Math.random()); // Question results from Trivia API, with random sort courtesy of https://codepen.io/rebelchris/pen/OJMpPog
			currentQuestionIndex = 0;
			// Invoke GAME START
		})
		.then((res) => {
			haveQuestions = true; // Logic if/else piece for GAME START
			return handleStartReset();
			//moved into a subsequent promise so that the game only starts when the questions have populated from the api call
		})
		//add a catch error to display any api call errors
		.catch((err) => console.error(err));
}
// ----------
// GAME START
// ----------
function handleStartReset() {
	if (haveQuestions) {
		// If haveQuestions is false goto else that invokes getQuestions

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
		createQuestionDisplayElement.innerHTML =
			questionsArray[currentQuestionIndex].question;
		// DOM create buttons and add innerTEXT for each
		let answerTargetLocation = document.querySelector('.js-answer-buttons');

		//create answers array and shuffle it (concatenate correct answers with incorrect answers, then shuffle)
		const answers = questionsArray[currentQuestionIndex].incorrect_answers
			.concat(questionsArray[currentQuestionIndex].correct_answer)
			.sort(() => 0.5 - Math.random());

		// ---------------------------------------------------
		// FOR LOOP TO ITERATE THROUGH ANSWERS ARRAY
		// ---------------------------------------------------
		for (let a = 0; a < answers.length; a++) {
			// --------------
			// CREATE BUTTONS
			// --------------
			let newButton = document.createElement('button');
			// Fill it with answersArray content and iterate
			newButton.innerHTML = answers[a];
			//use innerHTML to correctly display content with HTML codes
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
			// Target class item for player score
			let playerScore = document.querySelector('.player-score');
			// Get elements with the class of answers - prep to disable button after click
			let buttons = document.getElementsByClassName('answer');

			// ------------------------------------------
			// LOOP TO DISABLE ANSWER BUTTONS AFTER CLICK
			// ------------------------------------------
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].disabled = true;
			}

			// Logic to validate if button selected matched the random index number assigned to our correct answer

			//THIS CODE HELPS PARSE HTML CODES INTO THEIR CHARACTERS
			const string = questionsArray[currentQuestionIndex].correct_answer;
			const parser = new DOMParser();
			const html = parser.parseFromString(string, 'text/html').body.innerHTML;

			if (e.target.innerHTML === html) {
				// Match comparison
				scoreTotal += 10; // Scoring
				playerScore.innerText = scoreTotal; // Update scoring
				e.target.style.color = 'green'; // Correct style selection color
				e.target.style.fontWeight = '900'; // Increasing font boldness
			} else {
				// If not a match
				scoreTotal -= 5; // Subtract points
				playerScore.innerText = scoreTotal; // Update scoring
				e.target.style.color = 'red'; // Incorrect style selection color
				e.target.style.fontWeight = '900'; // Increasing font boldness
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
		}
		// ----------------------------------------
		// CLEARING THE GAME BOX FOR A NEW QUESTION
		// ----------------------------------------
	} else {
		haveQuestions = false;
		getQuestions(); // exit if loop - API fetch
	}
}
handleStartReset(); // Runs after loading JS then loops through if / else to before calling API

//MOVING THIS FUNCTION OUTSIDE OF THE HANDLESTARTRESET FUNCTION PREVENTS CURRENT QUESTION INDEX FROM INCREMENTING DOUBLY
function clearGameBox() {
	// Target different classes so we can clear them
	let question = document.querySelector('.questions-box');
	let answerButtons = document.querySelector('.answer-buttons');
	let clearGameNavControls = document.querySelector('.game-nav-controls');
	// Clear the previously targeted elements and replace with empty strings
	question.innerHTML = '';
	answerButtons.innerHTML = '';
	clearGameNavControls.innerHTML = '';
	currentQuestionIndex++;
	if (currentQuestionIndex < questionsArray.length) {
		handleStartReset(); // Invoke GAME START
	} else {
		haveQuestions = false;
		getQuestions();
	}
}
