// Target the control-panel buttons
let controlPanelButton = document.querySelector('.js-button');

// Add event listener to the control-panel start-reset button
controlPanelButton.addEventListener('click', handleStartReset);

// [BONUS TODO] Create short category dropdown list and store to variable for url
// [BONUS TODO] Create number of questions dropdown list and store to variable for url
// [BONUS TODO] Create start button in DOM

// Connect to trivia API for questions
function handleStartReset(e) {
	console.log({ e });
	// Fetch category URL Variable and number of questions
	// let catURL = e.target.dataset.url;  // THIS REQUIRES ATTENTION
	// let numbOfQuestions = e.target.dataset.questions; // THIS REQUIRES ATTENTION

	fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
		.then((res) => {
			return res.json();
		})
		.then((res) => {
			// Console logs to check res output
			console.log({ res });
			console.log(res.results[0].question);
			console.log(res.results[0].correct_answer);
			
			
			// DOM and question added to HTML
			let questionTargetLocation = document.querySelector('.questions-box');
			console.log({questionTargetLocation});
			let createQuestionDisplayElement = document.createElement('p');
			console.log({createQuestionDisplayElement});
			questionTargetLocation.append(createQuestionDisplayElement)
			createQuestionDisplayElement.innerText = res.results[0].question;
			
			// DOM create buttons and add innerTEXT for each
			let answerTargetLocation = document.querySelector('.js-answer-buttons');
			console.log({answerTargetLocation});
			let incorrectAnswers = res.results[0].incorrect_answers;
			console.log({incorrectAnswers});
			
			// ---------------------------------------------------	
			// FOR LOOP TO ITERATE THROUGH INCORRECT ANSWERS ARRAY
			// ---------------------------------------------------

			// [TODO]
			// store randNum=randomNumberGenerated numbers here
			// push correct answer to incorrectAnswers array at the index of randNum (don't overwrite anything that might be at that position)
			// -----------------------------------------------

			for (let a = 0; a < incorrectAnswers.length; a++) {
				console.log(incorrectAnswers[a]);
				
				// [TODO] clean up and make if loop
				// Else create incorrect answer buttons
				// ------------------------------------

				// --------------
				// CREATE BUTTONS
				// --------------
				let newButton = document.createElement('button');
  				// Fill it with some content 
				let newIncorrectAnswer = document.createTextNode(`${incorrectAnswers[a]}`); 
				newButton.appendChild(newIncorrectAnswer);
				// Add text node to the newly created buttons
				answerTargetLocation.appendChild(newButton);
				
				// [TODO]
				// IF a == randNum create an answer button
				// ---------------------------------------

				
			}
			
			// --------------
			// ANSWER SECTION
			// --------------
			let correctAnswer = res.results[0].correct_answer;
			console.log(correctAnswer);

			// Create Button
			let newAnswerButton = document.createElement('button');
			// Fill it with some content
			let newCorrectAnswer = document.createTextNode(`${correctAnswer}`);
			newAnswerButton.appendChild(newCorrectAnswer);
			// [TODO]
			// Set data-attribute that this is the correct answer
			
			// Add text node to the newly created button
			answerTargetLocation.appendChild(newAnswerButton);
			
			// ---------------------------------
			// CREATE RANDOM ORDER FOR QUESTIONS
			// ---------------------------------
			// Button order including answer button
			// Math.floor(Math.random() * 4);

	
		});

}
