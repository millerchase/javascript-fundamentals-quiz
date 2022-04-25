// VARS AND REFS

let quizTimerCount;
let questionNumber = 0;

const startBtnEl = document.querySelector("#start-btn");
const quizTimeEl = document.querySelector("#quiz-timer");
const introEl = document.querySelector("#intro");
const answerLstEl = document.querySelector("#answers-list");
const quizQuestionEl = document.querySelector("#quiz-question")

const problem1 = {
    question: "Commonly used data types DO NOT include:",
    answerChoices: ["booleans", "strings", "numbers", "alerts"],
    correctAnswer: "alerts"
};

// question objects
const questions = [problem1];

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

const startHandler = function(event) {
    startQuizTimer(75);
};

const displayQuestion = () => {
    let currentQuestion = questions[questionNumber];

    // set quiz question
    quizQuestionEl.innerHTML = `<h2>${currentQuestion.question}</h2>`;

    // create answer choices
    let questionLetter = ["a","b","c","d"];
    // <div class="answer" data-choice="a"><span class="letter" data-choice="a">A.</span><span class="answer-text" data-choice="a">Booleans</span></div>

    for (let i = 0; i < currentQuestion.answerChoices.length; i++) {
        // create answer choice div
        let answerChoiceEl = document.createElement("div");
        answerChoiceEl.className = "answer"
        answerChoiceEl.setAttribute("data-choice", currentQuestion.answerChoices[i]);

        // answer choice letter
        let choiceLetterEl = document.createElement("span");
        choiceLetterEl.className = "letter";
        choiceLetterEl.setAttribute("data-choice", currentQuestion.answerChoices[i]);
        choiceLetterEl.innerText = `${questionLetter[i].toUpperCase()}.`;
        answerChoiceEl.appendChild(choiceLetterEl);

        // choice text
        let choiceTextEl = document.createElement("span");
        choiceTextEl.className = "answer-text";
        choiceTextEl.dataset.choice = currentQuestion.answerChoices[i];
        choiceTextEl.innerText = currentQuestion.answerChoices[i].toUpperCase();
        answerChoiceEl.appendChild(choiceTextEl);

        // append answer choice to answer list
        answerLstEl.appendChild(answerChoiceEl);
    }

};

const answerChoiceHandler = event => {
    let answerChoice = event.target;
    console.log(answerChoice.dataset.choice);
}

// EVENT LISTENERS

// start quiz
startBtnEl.addEventListener("click", startHandler);

// select answer
answerLstEl.addEventListener("click", answerChoiceHandler);

displayQuestion();