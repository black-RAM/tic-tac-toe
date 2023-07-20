# tic-tac-toe
A tic-tac-toe game created as part of the Odin Project.
The architecture is a implementation of the Model-View-Controller design pattern:

The game variable is initialised as a signleton, using a factory function that is an IIFE (using arrow syntax). The game object represents the main model.
Within the game object:
- The board is stored as a 2D array, with a nested array for each of the three rows
- initiliseBoard() populates the array with null
- getEmptyCells returns the coordinates of every null element (empty cell).
- makeMove, takes an array of the coordinates and the player's symbol
    first checks if the chosen coordinate is null (is free).
    if it is, it places the player's symbol there.
    And it then updates the empty cells array.
    Finally, it returns a boolean of weather the operation was sucessful.
- Lastly, the code relating to the observer pattern:
  - the observers are stored as an array
  - the subscribe function adds an observer
  - the notify function updates all the observers with the new board state
  it calls the update method, which is present in both observers
  This pattern is utilised so the game controller and viewer update when a move is made
  
The player function expression corresponds to a constructor, which instantiates an object with the passed parameters: the name, the player's symbol, and weather or not its a human player. It is implemented as a factory function, hence removing the Java-like verbosity from the class syntax. 

  The makeMove method passes the position the user picks, but if its a computer player, it picks a random coordinate from the emptyCells array. (I may add AI functionality to this later.)
