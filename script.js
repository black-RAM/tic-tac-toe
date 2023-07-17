// Game board factory IIFE, a singleton object
const game = (() => {
  // board stored as a 2D array
  const board = [
    [],
    [],
    []
  ];

  function initialiseBoard(){
    // populate grid with null
    for (let row of board) {
      for(let i = 0; i < 3; i++){
        row.push(null);
      }
    }
  }
  initialiseBoard();

  function makeMove (symbol, row, col) {
    let valid = (board[row][col] === null);

    if(valid) {
      board[row][col] = symbol;
    }
  }
  
  
  return {board, initialiseBoard, makeMove};
})();

// player factory
const Player = (name, symbol, isHuman) => {
  function play(row, col) {
    game.makeMove(symbol, row, col);
  }
  return {name, symbol, isHuman, play};
};

let user = Player("Ariel", "X", true);
let computer = Player("Computer", "O", false);