const Game = (() => {
  let board = [
    [],
    [],
    []
  ];

  function initialiseBoard() {
    // make sure board is clear
    board = [
      [],
      [],
      []
    ]
    // populate board with null
    for (const row of board) {
      for (let i = 0; i < 3; i++) {
        row.push(null);
      }
    }
    // update observers
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
const playerName = prompt("What is your name?");
const user = Player(playerName, "X", true);
const computer = Player("Computer", "O", false);

// Game Controller
const GameController = (() => {
  let currentPlayer = null;
  let gameEnded = false;

  function startGame () {
    Game.initialiseBoard();
    currentPlayer = user;
    gameEnded = false;
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
    const winConditions = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],

      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],

      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if ( // check is symbol is same for winning condition
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        gameEnded = true;
        GameView.say(`${currentPlayer.name} wins!`);
        return;
      }
    }

    // Draw condition
    const emptyCells = Game.getEmptyCells();
    if (emptyCells.length === 0) {
      gameEnded = true;
      GameView.say("It's a draw");
    }
  }

  function update(board) {
    checkEndGame(board);
  }

  return {startGame, userMove, update};
})();
Game.subscribe(GameController);

// Game View
const GameView = (() => {
  const gameTable = document.querySelector(".board");

  // display board in DOM
  function update(board) {  
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const cellElement = gameTable.rows[row].cells[col];
          cellElement.textContent = board[row][col] || ""; // Set the symbol or an empty string if cell is null
        }
    }
  }

  // Display win message
  function say(string) {
    document.getElementById("message").innerText = string;
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

  // hook up restart button
  const restart = document.getElementById("restart");
  restart.addEventListener("click", () => {
    GameController.startGame();
  })

  return {update, say};
})()
Game.subscribe(GameView)

// begin game
GameController.startGame();