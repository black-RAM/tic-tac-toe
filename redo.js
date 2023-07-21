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