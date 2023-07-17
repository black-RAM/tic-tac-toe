# tic-tac-toe
A tic-tac-toe game created as part of the Odin Project.
The architecture is a implementation of the Model-View-Controller design pattern:

The game variable is initialised as a signleton, using a factory function that is an IIFE (using arrow syntax). The game object represents the main model.
Within the game object:
- The board is stored as a 2D array, with a nested array for each of the three rows
- initiliseBoard() populates the array with null
- makeMove first checks if the chosen coordinate is null (is free)
  if it is, it places the player's sign there.

This is the other model. The player function expression corresponds to a constructor, which instantiates an object with the passed parameters. It is implemented as a factory function, hence removing the Java-like verbosity from the class syntax. It also has the .play() method, which places the user's symbol at the given coordinate. If the user is human, it would place the symbol at the coordinates passed as parameters. If it is the computer, the coordinates are random numbers.
