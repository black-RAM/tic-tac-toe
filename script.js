// Game board factory IIFE, a singleton object
const game = (() => {
  // board stored as a 2D array
  const board = [
    [],
    [],
    []
  ];

  function initializeBoard(){
    // populate grid with empty strings
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
  
  return {board, initializeBoard, emptyCells};
})();

// Player factory
const Player = (name, symbol, isHuman) => {
  function makeMove(row, col) {
    let coordinates = [row, col];
    let valid = false;

    if (isHuman) {
      valid = game.emptyCells.some(cell => cell[0] === coordinates[0] && cell[1] === coordinates[1]);
    } else {
      coordinates[0] = Math.floor(Math.random() * 3);
      coordinates[1] = Math.floor(Math.random() * 3);
      valid = true; // Computer move is always considered valid
    }

    if (valid) {
      game.board[coordinates[0]][coordinates[1]] = symbol;
    }

    return valid;
  };

  return { name, symbol, isHuman, makeMove };
};