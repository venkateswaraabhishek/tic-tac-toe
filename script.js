const gameBoard = (() => {
    // The game board array represents the state of the game.
    // Each cell can be "X", "O", or empty.
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const makeMove = (index, player) => {
      if (board[index] === "") {
        board[index] = player;
        return true; // Move is successful
      } else {
        return false; // Move is invalid
      }
    };
  
    const resetBoard = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, makeMove, resetBoard };
  })();
  
  const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const status = document.querySelector(".game--status");
    let currentPlayer = "";
  
    const render = () => {
      const board = gameBoard.getBoard();
      for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = board[i];
      }
      status.textContent = getGameStatus();
    };
  
    const getGameStatus = () => {
      const board = gameBoard.getBoard();
      const winningCombinations = [
        // All possible winning combinations
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
          return `Game over! ${board[a]} wins!`;
        }
      }
      if (board.includes("")) {
        return `Current player: ${getCurrentPlayer()}`;
      } else {
        return "Game over! It's a tie.";
      }
    };
  
    const getCurrentPlayer = () => {
      if (currentPlayer === "") {
        currentPlayer = Math.random() < 0.5 ? "X" : "O";
      }
      const board = gameBoard.getBoard();
      const xCount = board.filter((cell) => cell === "X").length;
      const oCount = board.filter((cell) => cell === "O").length;
      return xCount === oCount ? currentPlayer : currentPlayer === "X" ? "O" : "X";
    };
  
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = cell.dataset.cellIndex;
        if (gameBoard.makeMove(index, getCurrentPlayer())) {
          render();
        }
      });
    });
  
    return { render };
  })();
  
  displayController.render();    