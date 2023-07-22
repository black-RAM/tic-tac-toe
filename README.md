# tic-tac-toe
A tic-tac-toe game created as part of the Odin Project.
The architecture is a implementation of the Model-View-Controller design pattern:

The Game module:
- contains 2D board array, the store of the game board state
- .initialiseBoard() populates board with null
- .getEmptyCells() returns a 2D array of all null coordinates
- .makeMove() places symbol at given coordinate, returns weather move was valid
- .subscribe() adds a dependency to the board observers; primarily for the gameView module
- .notify() updates observers with latest board state. Private variable.

The Player class: Uses a concise factory function to return an object with the passed name, symbol and isHuman parameters. It is then called twice to initialise the user object and computer object.

THe GameController module:
- variables: currentPlayer, gameEnded: boolean
- startGame (public): calls .initialiseBoard, sets currentPlayer to user
- computerMove (private): 
  picks random coordinates returned from .getEmptyCells, 
  passes them to .makeMove(), 
  calls checkGameEnd(),
  sets currentPlayer back to user,
- userMove (public):
  calls .makeMove with passed coordinates, assigns return to validMove
  if move was valid, it triggers the computer's turn
- checkEndGame: checks board for terminating conditions (currently unfinished)