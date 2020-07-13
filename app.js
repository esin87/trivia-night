// Target the control-panel buttons
let controlPanelButton = document.querySelector('.js-button');

// Add event listener to the control-panel start-reset button
controlPanelButton.addEventListener('click', handleStartReset);

// [TODO] Create short category dropdown list and store to variable for url
// [TODO] Create number of questions dropdown list and store to variable for url
// [TODO] Create start button in DOM
// let catStart = document.createElement('button');

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
			// Check res output
			console.log({ res });
			let displayQuestion = document.querySelector('.question-box');
			let showQuestion = displayQuestion.createElement('div');
			console.log(res.results[0].question);
		});
	if (e.target.classList.contains('.js-button')) {
		console.log('Line 30');
	}
}

//
