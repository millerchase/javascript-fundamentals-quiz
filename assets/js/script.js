const startBtnEl = document.querySelector("#start-btn");
const quizTimeEl = document.querySelector("#quiz-timer");
const introEl = document.querySelector(".intro");


// FUNCTIONS

// countdown to zero from specified number in one second increments
const startCountdown = (startNum) => {
    quizTimeEl.innerText = startNum;
    let count = startNum;
    introEl.classList.add("hidden");
    
    let countdown = setInterval(() => {
        if(count > 0){
            quizTimeEl.innerText = count;
            count--;
        } else {
            quizTimeEl.innerText = count;
            clearInterval(countdown);
            introEl.classList.remove("hidden");
        }
    }, 1000);
}

const startHandler = function(event) {
    startCountdown(10);
};



// EVENT LISTENERS
startBtnEl.addEventListener("click", startHandler);
