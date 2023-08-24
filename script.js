var startButton = document.getElementById("start-button");
var questionContainer = document.getElementById("question-container");
var questionText = document.getElementById("question-text");
var answerButtons = document.querySelectorAll(".answer");
var timerElement = document.getElementById("timer");
var initialsInput = document.getElementById("initials");
var saveButton = document.getElementById("save-button");

var questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "High Technology Markup Language", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  timer = setInterval(updateTimer, 1000);
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.innerText = question.question;

  answerButtons.forEach((button, index) => {
    button.innerText = question.answers[index].text;
    button.addEventListener("click", () => selectAnswer(index));
  });
}

function selectAnswer(selectedIndex) {
  if (questions[currentQuestionIndex].answers[selectedIndex].correct) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  } else {
    timeLeft -= 10;
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
