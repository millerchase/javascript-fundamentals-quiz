// VARS AND REFS

let quizTimerCount;
let questionNumber = 0;

const startBtnEl = document.querySelector("#start-btn");
const quizTimeEl = document.querySelector("#quiz-timer");
const introEl = document.querySelector("#intro");
const answerLstEl = document.querySelector("#answers-list");
const quizQuestionEl = document.querySelector("#quiz-question")
const answerResultEl = document.querySelector("#answer-result");

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
    
    let countdown = setInterval(() => {
        if(quizTimerCount > 0){
            quizTimeEl.innerText = quizTimerCount;
            quizTimerCount--;
        } else {
            quizTimeEl.innerText = quizTimerCount;
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

const startHandler = function(event) {
    introEl.className = "hidden";
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
            answerResultEl.innerText = "✅ Correct!"
            answerResultEl.className = "correct";
            questionNumber++;
        } else {
            // if choice is wrong
            answerResultEl.innerText = "❌ Wrong!";
            answerResultEl.className = "incorrect";
            quizTimerCount -= 5;
            questionNumber++;
        }
        displayQuestion();
    }
}

// EVENT LISTENERS

// start quiz
startBtnEl.addEventListener("click", startHandler);

// select answer
answerLstEl.addEventListener("click", answerChoiceHandler);