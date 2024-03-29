// VARS AND REFS

let quizTimerCount;
let questionNumber = 0;
let quizInProgress;
let score;

// array for saving scores
let highScores = [];

const startBtnEl = document.querySelector("#start-btn");
const quizTimerEl = document.querySelector("#quiz-timer");
const quizTimeEl = document.querySelector("#quiz-time");
const introEl = document.querySelector("#intro");
const viewHighScoreEl = document.querySelector("#view-score-page");
const answerLstEl = document.querySelector("#answers-list");
const quizEl = document.querySelector("#quiz");
const quizQuestionEl = document.querySelector("#quiz-question");
const answerResultEl = document.querySelector("#answer-result");
const quizEndEl = document.querySelector("#quiz-end");
const scoreEl = document.querySelector("#score");
const scoreFormEl = document.querySelector("#score-form");
const highScoresEl = document.querySelector("#high-scores");
const highScoresListEl = document.querySelector("#high-scores-list");
const clearBtnEl = document.querySelector("#clear-btn");

// create quiz problems
const problem1 = {
    question: "Commonly used data types DO NOT include:",
    answerChoices: ["booleans", "alerts", "numbers", "strings"],
    correctAnswer: "alerts"
};

const problem2 = {
    question: "Arrays in JavaScript can be used to store _________.",
    answerChoices: ["numbes and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"
};

const problem3 = {
    question: "The condition in an if / else statement is enclosed with _________.",
    answerChoices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis"
};

const problem4 = {
    question: "String values must be enclosed within _________ when being assigned to variables.",
    answerChoices: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes"
};

const problem5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerChoices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer:"console.log"
};

// array of each problem
const problems = [problem1, problem2, problem3, problem4, problem5];

// FUNCTIONS

// countdown to zero from specified number in one second increments
const startQuizTimer = (startNum) => {
    quizTimeEl.innerText = startNum;
    quizTimerCount = startNum;
    // introEl.classList.add("hidden");
    
    let countdown = setInterval(function() {
        if (quizInProgress) {
            if (quizTimerCount > 0) {
            quizTimeEl.innerText = quizTimerCount;
            quizTimerCount--;
            } else {
            quizTimeEl.innerText = quizTimerCount;
            clearInterval(countdown);
            quizEndHandler();
            }
        } else {
            clearInterval(countdown);
        }       
    }, 1000);
}

const displayQuestion = () => {
    let currentQuestion = problems[questionNumber];

    // clear previous problem if there
    let answers = document.querySelectorAll(".answer");
    if(answers.length > 0) {
        answerLstEl.innerHTML = "";
    }

    // set quiz question
    quizQuestionEl.innerHTML = `<h2>${currentQuestion.question}</h2>`;

    // create answer choices
    let questionLetter = ["a","b","c","d"];

    for (let i = 0; i < currentQuestion.answerChoices.length; i++) {
        // create answer choice div
        let answerChoiceEl = document.createElement("div");
        answerChoiceEl.className = "answer";
        answerChoiceEl.dataset.choice = currentQuestion.answerChoices[i].toLowerCase().replace(" ", "-");

        // answer choice letter
        let choiceLetterEl = document.createElement("span");
        choiceLetterEl.classList.add("letter", "answer");
        choiceLetterEl.dataset.choice = currentQuestion.answerChoices[i].toLowerCase().replace(" ", "-");
        choiceLetterEl.innerText = `${questionLetter[i].toUpperCase()}.`;
        answerChoiceEl.appendChild(choiceLetterEl);

        // choice text
        let choiceTextEl = document.createElement("span");
        choiceTextEl.classList.add("answer-choice-text", "answer");
        choiceTextEl.dataset.choice = currentQuestion.answerChoices[i].toLowerCase().replace(" ", "-");
        choiceTextEl.innerText = `${currentQuestion.answerChoices[i][0].toUpperCase()}${currentQuestion.answerChoices[i].slice(1)}`; // capitalizes first letter of choice text
        answerChoiceEl.appendChild(choiceTextEl);

        // append answer choice to answer list
        answerLstEl.appendChild(answerChoiceEl);
    }

};

const displayResult = result => {
    // check if choice was correct or in correct
    switch (result) {
        case "correct":
            answerResultEl.innerText = "✅ Correct!";
            answerResultEl.className = "correct";
            break;
        case "incorrect":  
            answerResultEl.innerText = "❌ Wrong!";
            answerResultEl.className = "incorrect";
            quizTimerCount -= 10;
            break;
    }  
    // clear result for next question 
    let clearResult = () => {
        answerResultEl.innerText = "";
        answerResultEl.className = "hidden";
    }; 
    setTimeout(clearResult, 800);  
}

const startHandler = () => {
    introEl.className = "hidden";
    quizInProgress = true;
    displayQuestion();
    startQuizTimer(75);
};

const answerChoiceHandler = event => {
    let currentQuestion = problems[questionNumber];
    // make sure an answer choice was selected
    if (event.target.classList.contains("answer")) {
        let answerChoice = event.target.dataset.choice;
        if (answerChoice === currentQuestion.correctAnswer.toLowerCase().replace(" ", "-")) {
            // if choice is correct
            displayResult('correct');
            questionNumber++;
        } else {
            // if choice is wrong
            displayResult('incorrect');
            questionNumber++;
        }
        // check if there is a next question
        if(problems[questionNumber]) {
            displayQuestion();
        } else {
            setTimeout(quizEndHandler, 800);
        }     
    }
};

const scoreHandler = () => {
    // return score value
    if(quizTimerCount > 0) {
        score = quizTimerCount + 1;
    } else {
        score = 0;
    }
    return score;
};

const quizEndHandler = () => {
    // end timer
    quizInProgress = false;
    // grab score
    score = scoreHandler();

    // clear quiz off screen
    answerLstEl.innerHTML = "";
    quizQuestionEl.innerText = "";
    quizEl.classList.add("hidden");

    // display quiz end
    quizEndEl.classList.remove('hidden');
    scoreEl.innerText = score;
};

const saveHighScore = (score, userInitials) => {
    highScores.push([score, userInitials]);
    highScores.sort();
    highScores.reverse();
    if (highScores.length > 5) {
        highScores.pop();
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
};

const loadHighScore = () => {
    highScores = localStorage.getItem("highScores");

    if(!highScores) {
        highScores = [];
        return false;
    }

    highScores = JSON.parse(highScores);
};

const clearHighScores = () => {
    localStorage.clear();
    updateHighScoreList();
    location.href = "./index.html";
};

const scoreFormHandler = event => {
    // prevent default
    event.preventDefault();
    // get user initials from form input
    let userInitials = document.querySelector("input[name='user-initials']").value || "ANN";
    if (score > 0) {
        if (!highScores || highScores.length < 5) {    
            saveHighScore(score, userInitials);
            updateHighScoreList();
        } else {
            // check against lowest high score
            let minHS = highScores[4][0];
            if (score > minHS) {
                saveHighScore(score, userInitials);
                updateHighScoreList();
            }
        }
        displayHighscoresHandler();
    }

};

const updateHighScoreList = () => {
    if(highScores.length > 0){
        // clear no high score text if it exists
        highScoresListEl.innerText = '';
        for (let i = 0; i < highScores.length; i++) {
            // create list item for each highscore
            let listItemEl = document.createElement("li");
            listItemEl.innerText = `${i +1}). ${highScores[i][1]} - ${highScores[i][0]}`;
            listItemEl.classList.add("list-item");
            
            // append each item to list
            highScoresListEl.appendChild(listItemEl);
        }
    } else {
        highScoresListEl.innerText = "No Current High Scores!";
    }
};

const displayHighscoresHandler = () => {
    // make sure quiz timer stops
    quizInProgress = false;

    // update display
    introEl.classList.add("hidden");
    quizEl.classList.add("hidden");
    quizEndEl.classList.add("hidden");
    viewHighScoreEl.classList.add("hidden");
    quizTimerEl.classList.add("hidden");

    highScoresEl.classList.remove("hidden");
};


// load high scores
loadHighScore();
updateHighScoreList();

// EVENT LISTENERS

// start quiz
startBtnEl.addEventListener("click", startHandler);

// select answer
answerLstEl.addEventListener("click", answerChoiceHandler);

// score form
scoreFormEl.addEventListener("submit", scoreFormHandler);

// view high score section
viewHighScoreEl.addEventListener("click", displayHighscoresHandler);

// clear high scores
clearBtnEl.addEventListener("click", clearHighScores);
