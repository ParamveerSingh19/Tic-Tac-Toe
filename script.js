let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scores = { X: 0, O: 0 };

const startButton = document.getElementById("welcome-btn");
const gameContainer = document.querySelector(".game-container");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");
const welcomeScreen = document.querySelector(".welcome-screen");
const xScoreText = document.getElementById("x-score");
const oScoreText = document.getElementById("o-score");

startButton.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  gameContainer.style.display = "block";
  updateStatus();
});

resetButton.addEventListener("click", resetGame);

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameBoard[index]) return;

  makeMove(index, currentPlayer);
  const winPattern = checkWinner();

  if (winPattern) {
    endGame(currentPlayer, winPattern);
  } else if (gameBoard.every((cell) => cell)) {
    endGame(null);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function makeMove(index, player) {
  gameBoard[index] = player;
  const cell = cells[index];
  cell.textContent = player;
  cell.classList.add(player);
}

function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function endGame(winner, pattern = []) {
  gameActive = false;
  if (winner) {
    statusText.textContent = `Player ${winner} wins!`;
    pattern.forEach((i) => cells[i].classList.add("win"));
    scores[winner]++;
    updateScores();
  } else {
    statusText.textContent = `It's a draw!`;
  }
}

function updateScores() {
  xScoreText.textContent = scores.X;
  oScoreText.textContent = scores.O;
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "win");
  });
  updateStatus();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return pattern;
    }
  }
  return null;
}
