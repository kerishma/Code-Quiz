const timerDisplay = document.getElementById("timer");
const finishedDisplay = document.getElementById("finished-container");
const questionsContainer = document.getElementById("questions-container");
const questionDisplayOne = document.getElementById("question-display-one");
const questionDisplayTwo = document.getElementById("question-display-two");
const questionDisplayThree = document.getElementById("question-display-three");
const questionDisplayFour = document.getElementById("question-display-four");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackText = document.getElementById("feedback-text");
const quizScore = document.getElementById("score");
const introDisplay = document.getElementById("intro");
const userInitials = document.getElementById("user-initials");
const nextButton = document.getElementById("next");
const submitScoreBtn = document.getElementById("submitScoreBtn");
const highScoreContainer = document.getElementById("highscoreContainer");
const showScoreLink = document.getElementById("showScores");
const hsTable = document.getElementById("hsTable");
const tableBody = document.getElementById("tableBody");

// internal (window) timer; used to reset
let interval;

// set the time for the quiz
let secondsElapsed = 50;

// this array will hold the elements which are choices (answers shown to user)
var choices = [];

// this array will hold the elements to show the questions and answers
const output = [];

// score is used to keep track of the user score
var score = 0;

var counter = 0;

// used for assigning the id for the question choice button
var pickCounter = 0;

// this holds the key,value pair for all users scores (localstorage)
var highScoreTracker = [];

// this is used to disable all the buttons after question is answered
var buttonCounter = 1;

// this is an array that holds the questions objects, choices answers; key,value objects
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
    question:
      "____________ is an attribute of an object, and it contains all data which is hidden." +
      " That hidden data can be restricted to the members of that class.",
    choices: {
      a: "Polymorphism",
      b: "Encapsulation",
      c: "Inheritance",
      d: "HTML",
    },
    answer: "Encapsulation",
  },
  {
    question:
      "__________ is a concept where one class shares the structure and behavior defined in another class." +
      " If Inheritance applied to one class is called Single Inheritance, and if it depends on multiple classes, then it is called multiple Inheritance.",
    choices: {
      a: "Polymorphism",
      b: "Classes",
      c: "Encapsulation",
      d: "Inheritance",
    },
    answer: "Inheritance",
  },
  {
    question:
      "__________ is nothing but assigning behavior or value in a subclass to something that " +
      "was already declared in the main class. Simply, polymorphism takes more than one form.",
    choices: {
      a: "Polymorphism",
      b: "Classes",
      c: "Encapsulation",
      d: "Inheritance",
    },
    answer: "Polymorphism",
  },
];

function setupQuiz() {
  startTimer();
  timerDisplay.innerHTML = "Time: " + secondsElapsed;
  introDisplay.style.display = "none";
  showScoreLink.style.pointerEvents = "none";
  nextButton.disabled = true;
  buildQuestions();
}

// This function is where the "time" aspect of the timer runs
// Notice no settings are changed other than to increment the secondsElapsed var
function startTimer() {
  /* The "interval" variable here using "setInterval()" begins the recurring increment of the
         secondsElapsed variable which is used to check if the time is up */
  interval = setInterval(function () {
    secondsElapsed--;
    // So renderTime() is called here once every second.
    renderTime();
  }, 1000);
}

// This function does 2 things. displays the time and checks to see if time is up.
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  timerDisplay.innerHTML = `Time: ${secondsElapsed}`;

  // ..and then checks to see if the time has run out
  if (secondsElapsed === 0) {
    questionsContainer.style.display = "none";
    stopTimer();
    finishQuiz();
  }
}

function stopTimer() {
  secondsElapsed = 0;
  clearInterval(interval);
}

function buildQuestions() {
  questionsContainer.style.display = "block";
  questionDisplayOne.style.display = "block";

  // iterate through the myQuestions array;
  // element is the question object, and iteration is the current place of the array
  // 4 question objects, 4 times in the loop
  myQuestions.forEach((element, iteration) => {
    // reset choices array so it wont contain pervious question choices
    choices = [];

    // iterate through the choices in the myQuestions array (4 times per question (iteration))
    for (choice in element.choices) {
      pickCounter++;
      choices.push(
        `
          <button type="button" class="list-group-item list-group-item-action" id="pick${pickCounter}" onclick="checkAnswers(event) ">
          ${element.choices[choice]}
          </button>
        `
      );
    }

    // output contains the entire question and its choices
    output.push(
      `
        <h3 id="question">${element.question}</h3>
        <div class="list-group" id="choices">${choices.join("")}</div>
      `
    );
  });
  questionDisplayOne.innerHTML = output[0];
}

function nextQuestion() {
  if (questionDisplayOne.style.display === "block") {
    resetValues();
    questionDisplayOne.style.display = "none";
    questionDisplayOne.innerHTML = null;
    questionDisplayTwo.innerHTML = output[1];
    questionDisplayTwo.style.display = "block";
  } else if (questionDisplayTwo.style.display === "block") {
    resetValues();
    questionDisplayTwo.style.display = "none";
    questionDisplayTwo.innerHTML = null;
    questionDisplayThree.innerHTML = output[2];
    questionDisplayThree.style.display = "block";
  } else if (questionDisplayThree.style.display === "block") {
    resetValues();
    questionDisplayThree.style.display = "none";
    questionDisplayThree.innerHTML = null;
    questionDisplayFour.innerHTML = output[3];
    questionDisplayFour.style.display = "block";
  }
}

function checkAnswers(event) {
  // get the button answer click event, get the text of that
  chosenAnswer = event.target.innerText;

  // we disable all of the buttons here after answer is chosen
  for (i = 1; i <= 4; i++) {
    if (document.getElementById(`pick${buttonCounter}`) !== null) {
      document.getElementById(`pick${buttonCounter}`).disabled = true;
      buttonCounter++;
    } else {
      break;
    }
  }

  // check if the answer is correct or not
  if (myQuestions[counter].answer === chosenAnswer) {
    feedbackContainer.style.display = "block";
    feedbackText.innerHTML = "Correct!";
    counter++;
    score++;
    nextButton.disabled = false;
  } else {
    feedbackContainer.style.display = "block";
    feedbackText.innerHTML = "Wrong!";
    counter++;
    secondsElapsed -= 10;
    nextButton.disabled = false;
  }

  // check to see if the final answer is displayed
  // if its displayed end the game
  if (
    questionDisplayFour.style.display === "block" &&
    feedbackContainer.style.display === "block"
  ) {
    nextButton.innerHTML = "Submit Quiz";
    nextButton.onclick = finishQuiz;
    showScoreLink.style.pointerEvents = "none";
  }
}

function finishQuiz() {
  stopTimer();
  questionDisplayFour.style.display = "none";
  feedbackContainer.style.display = "none";
  nextButton.style.display = "none";
  showResults();
}

function showResults() {
  finishedDisplay.style.display = "flex";
  quizScore.innerHTML = `Your final score is: ${score}`;
}

function showHighScore() {
  // get the users initials entered in the input element
  var userInitial = userInitials.value;

  // keep the highscore tracker array up to date with the localstorage entries
  // without this the highscore tracker array is reset because
  // we reset the game and memory is erased
  if (JSON.parse(localStorage.getItem("highscores")) != null) {
    highScoreTracker = JSON.parse(localStorage.getItem("highscores"));
  }

  // if user didnt input initials, alert
  if (userInitial == "") {
    alert("Please enter initials!");
  } else {
    // we start the process to show the table with scores
    finishedDisplay.style.display = "none";
    highScoreTracker.push({ user: userInitial, score: score });
    // send the highscore array to localstorage
    localStorage.setItem("highscores", JSON.stringify(highScoreTracker));
    createScoreTable();
    highScoreContainer.style.display = "block";
  }
}

function createScoreTable() {
  // get the localstorage for highscores
  const quizEntry = JSON.parse(localStorage.getItem("highscores"));

  // check to see if highscores exist, if not return to showHighScore
  if (quizEntry == null) {
    return null;
  } else {
    // iterate/loop through the entries in localstorage
    quizEntry.forEach(function (entry) {
      var tableRow = document.createElement("tr");
      var tableDataUser = document.createElement("td");
      var tableDataScore = document.createElement("td");
      // put the <td> inside of <tr> for user initial
      tableRow.appendChild(tableDataUser);
      // put the <td> inside of <tr> for score
      tableRow.appendChild(tableDataScore);
      // put the value of the user initial inside of the <td>
      tableDataUser.appendChild(document.createTextNode(entry.user));
      // put the value of the user score inside of the <td>
      tableDataScore.appendChild(document.createTextNode(entry.score));
      // put the <tr> inside of the <tbody>
      tableBody.appendChild(tableRow);
    });
  }
}

function displayHighScore() {
  showScoreLink.style.pointerEvents = "none";
  hideAllContainers();
  createScoreTable();
  highScoreContainer.style.display = "block";
  highScoreContainer.style.display = "block";
}

function hideAllContainers() {
  questionsContainer.style.display = "none";
  feedbackContainer.style.display = "none";
  introDisplay.style.display = "none";
}

function resetValues() {
  feedbackContainer.style.display = "none";
  feedbackText.innerHTML = "";
  nextButton.disabled = true;
}

function clearScores() {
  localStorage.clear();
  createScoreTable();
  location.reload();
}

function resetQuiz() {
  location.reload();
}

nextButton.addEventListener("click", nextQuestion);
submitScoreBtn.addEventListener("click", showHighScore);
