// Target the control-panel buttons
let controlPanelButton = document.querySelector('.js-button');

// Add event listener to the control-panel start-reset button
controlPanelButton.addEventListener('click', handleStartReset);

// [BONUS TODO] Create short category dropdown list and store to variable for url
// [BONUS TODO] Create number of questions dropdown list and store to variable for url
// [BONUS TODO] Create start button in DOM

// TEST - QUESTIONS ARRAY
let questionsArray;
let currentQuestion = 0;
let answersArray;
let currentAnswer = 0;

// ---------------------------------
// CREATE RANDOM ORDER FOR QUESTIONS
// ---------------------------------
// Button order including answer button
let answersArrayCorrectIndex = Math.floor(Math.random() * 4);
console.log({ answersArrayCorrectIndex });

// Connect to trivia API for questions
function handleStartReset() {
	// e.preventDefault();
	// Click handler check
	// console.log({e});

	// API information fetch
	fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			// Console logs to check res output
			console.log({ res });
			// console.log(res.results[0].question);
			// console.log(res.results[0].correct_answer);

			// TEST - SEND TO QUESTIONS ARRAY
			questionsArray = res.results;
			// TEST - INCREMENT QUESTION NUMBER upon advance
			// currentQuestion++
			// TEST - Check questionArray contents
			console.log(questionsArray[currentQuestion]);

			// --------------------------------
			// TEST - PUSH ALL ANSWERS TO ARRAY
			// --------------------------------

			// answerArray storing the incorrect answers
			answersArray = questionsArray[currentQuestion].incorrect_answers;
			console.log({ answersArray });

			// Selecting the correct answer and storing it to currentAnswer
			currentAnswer = questionsArray[currentQuestion].correct_answer;
			console.log({ currentAnswer });

			// Splicing in the correct currentAnswer using answersArrayCorrectIndex random
			// The correct answer is now randomly spliced into answersArray
			answersArray.splice(answersArrayCorrectIndex, 0, currentAnswer);
			console.log({ answersArray });
			// ---------------------------------

			// DOM and question added to HTML
			let questionTargetLocation = document.querySelector('.questions-box');
			console.log({ questionTargetLocation });
			let createQuestionDisplayElement = document.createElement('p');
			createQuestionDisplayElement.setAttribute('class', 'question');
			console.log({ createQuestionDisplayElement });
			questionTargetLocation.append(createQuestionDisplayElement);
			createQuestionDisplayElement.innerText = res.results[0].question;

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

				// [TODO]
				// Set data-attribute that this is the correct answer to buttons
				newButton.setAttribute('data-id', a);
				newButton.setAttribute('class', 'answer');
				newButton.addEventListener('click', answersHandler);

				// TEST - if user clicks the correct answer, on-click do the following
			}
			// ------------------------
			// ANSWER BUTTONS FUNCTIONS
			// ------------------------
			function answersHandler(e) {
				e.preventDefault();
				console.log(e.target);
				console.log(e.target.classList);
				console.log(e.target.getAttribute('data-id'));
				let placeHolder = e.target.getAttribute('data-id');

				console.log(answersArrayCorrectIndex);

				if (answersArrayCorrectIndex == placeHolder) {
					e.target.style.color = 'green';
					e.target.style.fontWeight = "900";
					console.log('good job');
				} else {
					e.target.style.color = 'red';
					e.target.style.fontWeight = '900';
					console.log(
						'loser :-P (jk hugs and kisses)'
					);
				}

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
			}
			// ----------------------------------------
			// Clearing the Game Box for a new question
			// ----------------------------------------
			function clearGameBox() {
				let question = document.querySelector('.questions-box');
				let answerButtons = document.querySelector('.answer-buttons');
				let nextButton = document.querySelector('.next-button');
				question.innerHTML = '&nbsp';
				answerButtons.innerHTML = '&nbsp';
				nextButton.innerHTML = '&nbsp'
				handleStartReset();
			}

		});
}
