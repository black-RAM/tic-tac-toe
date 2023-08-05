Code Architecture:
1. **Game Module (`Game`):**
   The `Game` module is responsible for managing the game board, game logic, and notifying observers (such as the GameController and GameView) about updates to the board. It encapsulates functions related to the game state.

   - `initialiseBoard()`: This function initializes the game board by populating it with `null` values, representing empty cells. After initializing the board, it calls the `notify()` function to inform observers about the initial state.
   - `getEmptyCells()`: This function returns an array of coordinates representing the empty cells on the game board.
   - `makeMove(row, col, symbol)`: This function allows making a move on the board by updating the cell at the specified coordinates with the given symbol. It also calls the `notify()` function to inform observers about the updated board state.
   - `subscribe(observer)`: This function allows observers to subscribe to updates from the game board.
   - `notify()`: This function notifies all subscribed observers about the current state of the game board.

2. **Player Factory (`Player`):**
   This factory function is used to create player objects with properties like `name`, `symbol`, and whether the player is human or computer-controlled.

3. **Game Controller (`GameController`):**
   The `GameController` module handles the game flow and user interactions. It listens to user clicks on the game board, controls the order of moves between the user and computer, and manages the game ending conditions.

   - `startGame()`: Initializes the game by calling `Game.initialiseBoard()` and sets the current player to the user.
   - `userMove(row, col)`: Handles the user's move, validates it, and updates the board. If the move is valid, it switches the current player to the computer and schedules the computer's move after a delay.
   - `computerMove()`: Generates a random valid move for the computer and updates the board.
   - `checkEndGame(board)`: Checks if the game has ended due to a win or draw condition. If either condition is met, it updates the `gameEnded` flag and displays a win or draw message.
   - `update(board)`: This function is called by the `Game` module when the board is updated. It calls `checkEndGame()` to determine if the game has ended.

4. **Game View (`GameView`):**
   The `GameView` module is responsible for rendering the game board and user interface elements on the web page.

   - `update(board)`: Updates the displayed game board based on the current state of the board passed as an argument.
   - `say(string)`: Displays the provided string message as a win or draw message on the web page.
   - Event Listeners: This module attaches event listeners to the game board cells and restart button. It delegates user moves to the `GameController` and restarts the game when the restart button is clicked.

5. **HTML Structure:**
   The HTML structure includes a game board table, restart button, and a message element for displaying win/draw messages. CSS styles can be applied to visually enhance the game interface.

This architecture follows the Model-View-Controller (MVC) design pattern, where the `Game` module acts as the model managing the game state, the `GameView` module represents the view responsible for rendering, and the `GameController` module serves as the controller managing the game flow and interactions. The player factory (`Player`) helps create player objects with different attributes.

Overall, this architecture promotes separation of concerns, making the codebase modular, easy to understand, and maintainable.