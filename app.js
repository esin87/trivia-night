// Target the control-panel buttons
let controlPanelButtons = document.querySelector('.start-reset-button');

// Add event listener to the control-panel start-reset button
controlPanelButtons.addEventListener('click', handleStartReset);

// Create short category drop down list
// let catList = document.createElement('');


// Connect to trivia API for questions
function handleStartReset (e) {
    // let userInput = document.querySelector('')
    e.preventDefaults();
    console.log({e})
    // Fetch category URL Variable and number of questions
    let catURL = e.target.dataset.url;  // THIS REQUIRES ATTENTION
    let numbOfQuestions = e.target.dataset.questions; // THIS REQUIRES ATTENTION
    
    fetch ('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                // Check res output
                console.log(res);
            })
}
