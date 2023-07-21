// Game board factory IIFE, a singleton object
const Game = (() => {
  // board stored as a 2D array
  const board = [
    [],
    [],
    []
  ];

  function initializeBoard(){
    // populate grid with null
    for (let row of board) {
      for(let i = 0; i < 3; i++){
        row.push(null);
      }
    }
    emptyCells = getEmptyCells(board);
    notify();
  }

  function getEmptyCells(grid) {
    let coordinates = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === null) {
          coordinates.push([row, col]);
        }
      }
    }
    return coordinates;
  }

  let emptyCells = getEmptyCells(board);

  function makeMove(row, col, symbol) {
    let cell = board[row][col];
    let valid = cell === null;

    if (valid) {
      board[row][col] = symbol;
      emptyCells = getEmptyCells(board);
      notify();
    }

    return valid;
  }

  // observer pattern
  let observers = [];
  function subscribe(observer) {
    observers.push(observer);
  }
  function notify(){
    for (const observer of observers) {
      observer.update(board, emptyCells);
    }
  }
  
  return {board, emptyCells, getEmptyCells, initializeBoard, makeMove, subscribe};
})();

// Player factory
const Player = (name, symbol, isHuman) => {
  return {name, symbol, isHuman};
};
const user = Player("Ariel", "X", true);
const computer = Player("Computer", "O", false);

// controller logic
const GameController = (() => {
  let currentPlayer = null;
  let gameEnded = false;

  function startGame() {
    Game.initializeBoard();
    currentPlayer = user;
  }

  function checkEndGame() {
    // logic for terminating conditions
  }

  function userMove (row, col) {
    if(gameEnded) return;
    Game.makeMove(row, col, user.symbol);

    // check for a win or draw
    checkEndGame();

    // Switch to computer's turn
    currentPlayer = computer;
  }

  function computerMove() {
    // Get the latest empty cells array and make the computer move
    const emptyCells = [Game.emptyCells];
    if (emptyCells.length === 0) {
      // No empty cells left, end the game
      gameEnded = true;
      return;
    }

    const randomPick = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomPick];
    Game.makeMove(row, col, computer.symbol);

    // Check for a winner or a draw after the computer's move
    checkEndGame();

    // Switch to the next player (user)
    currentPlayer = user;
  }

  function computerTurn() {
    if (!gameEnded && currentPlayer === computer) {
      setTimeout(() => {
        computerMove();
      }, 500); // Delay computer move for better user experience
    }
  }

  // Observer pattern - store latest state
  function update(board) {
    Game.board = board;

    // Update the emptyCells array with the latest coordinates
    Game.emptyCells = Game.getEmptyCells(board);

    // trigger computer's turn
    computerMove();
  }
  return {update, startGame, userMove}
})();
Game.subscribe(GameController);

// view
const GameView = (() => {
  function update(board) {
    // update DOM
    console.log(board);
  }
  return {update};
})();
Game.subscribe(GameView);

// test the start game method
GameController.startGame();
GameController.userMove(1, 1);