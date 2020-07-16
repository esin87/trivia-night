// Target the control-panel buttons
// let controlPanelButton = document.querySelector('.js-button');

// DEPRECATED
// Add event listener to the control-panel start-reset button
// controlPanelButton.addEventListener('click', handleStartReset);

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


// API information fetch
function getQuestions (){
	fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
	.then((res) => {
		return res.json();
	})
		.then((res) => {
			// --------------------------------
			// Console logs to check res output
			// --------------------------------
			// console.log({res});
			// console.log(res.results[0].question);
			// console.log(res.results[0].correct_answer);
	
			// SEND TO QUESTIONS ARRAY
			questionsArray = res.results;
			console.log({questionsArray});
			haveQuestions = true;
			handleStartReset();
		})
	}
	
	// Connect to trivia API for questions
function handleStartReset() {
	// console.log(questionsArray)
	// console.log(haveQuestions);
	if (haveQuestions) {
		// INCREMENT QUESTION NUMBER upon advance
		console.log(questionsArray[currentQuestion]);
		console.log({currentQuestion});
		console.trace(currentQuestion);
		
		// Check questionArray contents
		// console.log(questionsArray[currentQuestion]);
		
		// ---------------------------------
		// CREATE RANDOM ORDER FOR QUESTIONS
		// ---------------------------------
		// Button order including answer button
		let answersArrayCorrectIndex = Math.floor(Math.random() * 4);
		console.log({ answersArrayCorrectIndex });
		console.log({currentAnswer});
		
		// --------------------------------
		// PUSH ALL ANSWERS TO ARRAY
		// --------------------------------
		// answerArray storing the incorrect answers
		answersArray = questionsArray[currentQuestion].incorrect_answers;
		console.log({ answersArray });
		
		// Selecting the correct answer and storing it to currentAnswer
		currentAnswer = questionsArray[currentQuestion].correct_answer;
		console.log({ currentAnswer });
		console.log({answersArray});
	
		// Splicing in the correct currentAnswer using answersArrayCorrectIndex random
		// The correct answer is now randomly spliced into answersArray
		// TEST -----------------------------------------------------------
		answersArray.splice(answersArrayCorrectIndex, 0, currentAnswer);
		// console.log({ answersArray });
		// console.log({currentAnswer});
		// TEST -----------------------------------------------------------

		// ------------------------------
		// DOM and question added to HTML
		// ------------------------------
		let questionTargetLocation = document.querySelector('.questions-box');
		// Confirm questionTargetLocation
		// console.log({ questionTargetLocation });
		let createQuestionDisplayElement = document.createElement('p');
		createQuestionDisplayElement.setAttribute('class', 'question');
		// Confirm createQuestionDisplayElement
		console.log({ createQuestionDisplayElement });
		questionTargetLocation.append(createQuestionDisplayElement);
		createQuestionDisplayElement.innerText = questionsArray[currentQuestion].question;
		
		// DOM create buttons and add innerTEXT for each
		let answerTargetLocation = document.querySelector('.js-answer-buttons');
		console.log({ answerTargetLocation });
		
		// ---------------------------------------------------
		// FOR LOOP TO ITERATE THROUGH INCORRECT ANSWERS ARRAY
		// ---------------------------------------------------
		for (let a = 0; a < answersArray.length; a++) {
			// console.log(answersArray[a]);
			
			// --------------
			// CREATE BUTTONS
			// --------------
			let newButton = document.createElement('button');
			// Fill it with some content
			let newButtonText = document.createTextNode(`${answersArray[a]}`);
			newButton.appendChild(newButtonText);
			// Add text node to the newly created buttons
			answerTargetLocation.appendChild(newButton);
			// console.log(newButtons[a]);
			
			// Set data-attribute that this is the correct answer to buttons
			newButton.setAttribute('data-id', a);
			newButton.setAttribute('class', 'answer');
			newButton.addEventListener('click', answersHandler);
		}
		
		// ------------------------
		// ANSWER BUTTONS FUNCTIONS
		// ------------------------
		function answersHandler(e) {
			// e.preventDefault();
			// --------------------
			// Console log check for e.target
			// --------------------
			// console.log(e.target);
			// console.log(e.target.classList);
			// console.log(e.target.getAttribute('data-id'));
			
			// Assign data-id attribute
			let placeHolder = e.target.getAttribute('data-id');
			// Check answersArrayCorrectIndex
			// console.log(answersArrayCorrectIndex);
			
			// Get player score display
			let playerScore = document.querySelector('.player-score');
			// console.log(playerScore);
			
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
				console.log('good job');
			} else {
				scoreTotal -= 5;
				playerScore.innerText = scoreTotal;
				e.target.style.color = 'red';
				e.target.style.fontWeight = '900';
				console.log('loser :-P (jk hugs and kisses)');
			}
			console.log({currentQuestion});
			
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
			currentQuestion++;
		}
		// ----------------------------------------
		// Clearing the Game Box for a new question
		// ----------------------------------------
		function clearGameBox() {
			// console.trace({currentQuestion});
			console.log({questionsArray});
			let question = document.querySelector('.questions-box');
			let answerButtons = document.querySelector('.answer-buttons');
			let nextButton = document.querySelector('.next-button');
			let clearGameNavControls = document.querySelector('.game-nav-controls');
			question.innerHTML = '';
			answerButtons.innerHTML = '';
			// nextButton.innerHTML = '';
			clearGameNavControls.innerHTML = '';
			handleStartReset();
		}
	} else {
		console.log("Success on passing through IF statement");
		getQuestions();
	};
};
handleStartReset();