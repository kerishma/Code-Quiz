const timerDisplay = document.getElementById("timer");
const finishedDisplay = document.getElementById("finished-container");
const questionsContainer = document.getElementById("questions-container");
const questionDisplayOne = document.getElementById("question-display-one");
const questionDisplayTwo = document.getElementById("question-display-two");
const introDisplay = document.getElementById("intro");
const nextButton = document.getElementById("next");
let interval;
let secondsElapsed = 10;
var choices = [];
const output = [];

const myQuestions = [
  {
    question: "What is NOT a feature of OOP",
    choices: {
      a: "Inheritance",
      b: "Encapsulation",
      c: "Classes",
      d: "Polymorphism",
    },
    answer: "Classes",
  },
  {
    question: "asd",
    choices: {
      a: "asd",
      b: "asd",
      c: "asd",
      d: "asd",
    },
    answer: "sd",
  },
];

function setupQuiz() {
  //   startTimer();
  introDisplay.style.display = "none";
  buildQuestions();
}

// // This function is where the "time" aspect of the timer runs
// // Notice no settings are changed other than to increment the secondsElapsed var
// function startTimer() {
//   /* The "interval" variable here using "setInterval()" begins the recurring increment of the
//          secondsElapsed variable which is used to check if the time is up */
//   interval = setInterval(function () {
//     secondsElapsed--;
//     // So renderTime() is called here once every second.
//     renderTime();
//   }, 1000);
// }

// // This function does 2 things. displays the time and checks to see if time is up.
// function renderTime() {
//   // When renderTime is called it sets the textContent for the timer html...
//   timerDisplay.innerHTML = "Time: " + secondsElapsed;

//   // ..and then checks to see if the time has run out
//   if (secondsElapsed === 0) {
//     questionDisplayOne.style.display = "none";
//     finishedDisplay.style.display = "block";
//     stopTimer();
//   }
// }

// function stopTimer() {
//   secondsElapsed = 0;
//   clearInterval(interval);
// }

function buildQuestions() {
  questionsContainer.style.display = "block";
  questionDisplayOne.style.display = "block";
  myQuestions.forEach((element, iteration) => {
    choices = [];

    for (choice in element.choices) {
      choices.push(
        `
            <button type="button" class="list-group-item list-group-item-action">
            ${element.choices[choice]}
            </button>
        `
      );
    }

    output.push(
      `
        <h1 class="display-4" id="question">${element.question}</h1>
        <div class="list-group" id="choices">${choices.join("")}</div>
        `
    );
  });
  questionDisplayOne.innerHTML = output[0];
}

function nextQuestion() {
  //   checkAnswers(button);
  if (questionDisplayOne.style.display === "block") {
    questionDisplayOne.style.display = "none";
    questionDisplayOne.innerHTML = null;
    questionDisplayTwo.innerHTML = output[1];
    questionDisplayTwo.style.display = "block";
  }
}

// function checkAnswers(button){
// }

nextButton.addEventListener("click", nextQuestion);
