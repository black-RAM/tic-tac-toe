# tic-tac-toe
A tic-tac-toe game created as part of the Odin Project.
Architecture:

The game variable is initialised as a signleton, using a factory function that is an IIFE (using arrow syntax).
Within the game object:
- The board is stored as a 2D array, with a nested array for each of the three rows
- initiliseBoard() populates the array with null
- getEmptyCells returns a 2D array of all 