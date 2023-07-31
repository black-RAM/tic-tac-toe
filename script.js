const Game = (() => {
  const board = [
    [],
    [],
    []
  ];

  function initialiseBoard() {
    for (const row of board) {
      for (let i = 0; i < 3; i++) {
        row.push(null);
      }
    }
    notify();
  }

  function getEmptyCells() {
    let coordinates = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          coordinates.push([row, col]);
        }
      }
    }
    return coordinates;
  }

  function makeMove(row, col, symbol) {
    let valid = board[row][col] === null;
    if (valid) {
      board[row][col] = symbol;
      notify(); 
    }
    return valid;
  }

  const observers = [];
  function subscribe(observer) {
    observers.push(observer);
  }

  function notify() {
    for (const observer of observers) {
      observer.update(board);
    }
  }

  return { board, getEmptyCells, initialiseBoard, makeMove, subscribe };
})();

// player factory
const Player = ((name, symbol, isHuman) => {
  return {name, symbol, isHuman}
});

const user = Player("Ariel", "X", true);
const computer = Player("Computer", "O", false);

// Game Controller
const GameController = (() => {
  let currentPlayer = null;
  let gameEnded = false;

  function startGame () {
    Game.initialiseBoard();
    currentPlayer = user;
  }

  function userMove(row, col) {
    if(gameEnded) return;

    const validMove = Game.makeMove(row, col, currentPlayer.symbol);

    if(validMove) {
      currentPlayer = computer;
      if (!gameEnded) {
        setTimeout(computerMove, 500); // Delay computer move for 500 milliseconds
      }
    }
  }

  function computerMove() {
    if(gameEnded || currentPlayer !== computer) return;

    // play random coordinates from empty coordinates
    const emptyCells = Game.getEmptyCells();
    let randomPick = Math.floor(Math.random() * emptyCells.length);
    let [row, col] = emptyCells[randomPick];
    Game.makeMove(row, col, currentPlayer.symbol);

    currentPlayer = user;
  }

  function checkEndGame(board) {
    console.log("I'm doing my job.")
    // Draw condition
    const emptyCells = Game.getEmptyCells();
    if (emptyCells.length === 0) {
      gameEnded = true;
      console.log("It's a draw!");
    }
  }

  function update(board) {
    checkEndGame();
  }

  return {startGame, userMove, update};
})();
Game.subscribe(GameController);

// Game View
const GameView = (() => {
  let gameTable = document.querySelector(".board");
  function update(board) {
    // display board in DOM
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          const cellElement = gameTable.rows[row].cells[col];
          cellElement.textContent = board[row][col] || ""; // Set the symbol or an empty string if cell is null
        }
    }
  }

  // Attach the event listener for cell clicks using event delegation
  gameTable.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "TD") {
      const row = target.parentElement.rowIndex;
      const col = target.cellIndex;
      GameController.userMove(row, col); // Delegate the user's move to the GameController
    }
  });

  return {update};
})()
Game.subscribe(GameView)

// game flow
GameController.startGame();