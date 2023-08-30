var startButton = document.getElementById("start-button");
var questionContainer = document.getElementById("question-container");
var questionText = document.getElementById("question-text");
var answerButtons = document.querySelectorAll(".answer");
var timerElement = document.getElementById("timer");
var initialsInput = document.getElementById("initials");
var saveButton = document.getElementById("save-button");
var saveContainer = document.getElementById("save-container");
let currentQuestionIndex = 0;
let timer;
let timeLeft = 60;

var questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "High Technology Markup Language", correct: false },
    ]
  },
  {
    question: "How many days are in october?",
    answers: [
      {text: "29", correct: false},
      {text: "31", correct: true},
      {text: "30", correct: false},
    ]
  },
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  timer = setInterval(updateTimer, 1000);
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  console.log(question);
  questionText.textContent = question.question;

  answerButtons.forEach((button, index) => {
    console.log(index);
    button.innerText = question.answers[index].text;
    button.addEventListener("click", () => selectAnswer(index));
  });
}

function selectAnswer(selectedIndex) {
  console.log(selectedIndex);
  if (questions[currentQuestionIndex].answers[selectedIndex].correct) {
    if (currentQuestionIndex < questions.length) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      endGame();
      saveContainer.removeAttribute("class");
    }
  } else {
    timeLeft -= 10;
  }
  if (timeLeft <= 0 || currentQuestionIndex === questions.length) { 
    endGame();
  }
    else {
      showQuestion();
    }
}

function updateTimer() {
  timerElement.innerText = timeLeft;
  if (timeLeft <= 0) {
    endGame();
  }
  timeLeft--;
}

function endGame() {
  clearInterval(timer);
  questionContainer.classList.add("hide");
  saveButton.classList.remove("hide");
}

saveButton.addEventListener("click", saveScore);

function saveScore() {
  const scores = JSON.parse(localStorage.getItem("scores"))||[]
  const initials = initialsInput.value;
  console.log("Initials:", initials);
  console.log("Score:", timeLeft);
  const score = {
    initials: initials,
    score: timeLeft
  } 
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));
}
