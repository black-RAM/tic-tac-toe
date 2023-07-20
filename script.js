// Game board factory IIFE, a singleton object
const game = (() => {
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
  }
  initializeBoard();

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

  function makeMove(coordinates, symbol) {
    let [row, col] = coordinates;
    let cell = board[row][col];
    let valid = cell === null;

    if (valid) {
      cell = symbol;
      emptyCells = getEmptyCells(board);
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
      observer.update(board);
    }
  }
  
  return {board, emptyCells, initializeBoard, makeMove, subscribe};
})();

// Player factory
const Player = (name, symbol, isHuman) => {
  function makeMove([coordinates]) {
    if (isHuman) {
      if(coordinates.length === 2){
        game.makeMove([coordinates], symbol);
      } else {
        console.warn("player.makeMove() can only be called with 2 elements in input array.")
      }
    } else {
      let randomPick = Math.floor(Math.random() * game.emptyCells.length);
      game.makeMove(
        game.emptyCells[randomPick],
        symbol
      );
    }
  };

  return { name, symbol, isHuman, makeMove };
};

// controller logic
const gameController = (() => {
  function update(board) {
    // call all methods again
  }
  return {update}
})();
game.subscribe(gameController);

// view
const gameView = (() => {
  function update(board) {
    // update DOM
  }
  return {update};
})();
game.subscribe(gameView);