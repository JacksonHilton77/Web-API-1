var highscoresElement = document.querySelector(".highscores");
const highscores = JSON.parse(localStorage.getItem("scores")) || [];
function getHighscores() {
    highscores.forEach(score => {
        let li = document.createElement("li");
        li.textContent = `Initials: ${score.initials} score: ${score.score}`;
        highscoresElement.appendChild(li);
    });
}
getHighscores();