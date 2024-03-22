document.addEventListener('DOMContentLoaded', () => {

const playerTurn = document.getElementById('playerTurn') // var for ref player turns
const gameGrid = document.getElementById('gameGrid') // var for game grid
const restartButton = document.getElementById('restartButton') // var for restart button

let currentPlayer = "X" // var for current player starting with x
let board = [[null,null,null], [null,null,null],[null, null, null]] // starts game board with empty arrays for each row

    function initializeGame() {
        for(let row = 0; row < 3; row++) { // creates grid row
            const gridRow = document.createElement('div')
            gridRow.className = 'grid-row'
            for (let col = 0; col < 3; col ++) {// creates grid cell
                const cell = document.createElement('div')
                cell.className = 'grid-cell'
                cell.addEventListener('click', () => handleCellClick(row, col))
                gridRow.appendChild(cell)
                board[row][col] = null
            }
            gameGrid.appendChild(gridRow)
        }
    }    
    
    function handleCellClick(row, col) {  // handle cell click
        if (board[row][col] || checkWin() || checkDraw ()) return // ignore cell if filled or game is over
        board[row][col] = currentPlayer // assign cell to current player
        updateBoard() // update board

        if (checkWin()) {  //checks for win & displays alert
            setTimeout(() => alert(`${currentPlayer} Wins!`), 10)
            return
        }
        if (checkDraw()){ // checks for draw & displays alert
            setTimeout(() => alert(`It's a draw`), 10)
            return
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // switch to other player
        playerTurn.textContent = `${currentPlayer}'s Turn`;
    }

    function updateBoard() {  // function to update the board
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cell = gameGrid.children[row].children[col]
                cell.textContent = board[row] [col] || ''
            }
        }
    }


    function checkWin() {  // checks if a player has won
        const winConditions = [  // in rows, colums and diagonals
            [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]] 
        ]
        for (let condition of winConditions) {
            const [[r1, c1], [r2, c2], [r3, c3]] = condition
            if (board[r1][c1] && board[r1][c1] === board[r2][c2] && board[r1][c1] === board[r3][c3]) {
                return true // returns true if any condition is met
            }
        }
        return false // return false if no condition is met
    }

    function checkDraw() {  // check if game is a draw - no empty cells
        return board.flat().every(cell => cell !== null)
    }

    restartButton.addEventListener('click', () => {  // restarts game
        gameGrid.innerHTML = '' // clears game grid
        board = [[null, null, null], [null, null, null], [null, null, null]]; // resets board
        currentPlayer = 'X' // reset current player to X
        playerTurn.textContent = `${currentPlayer}'s Turn` // updates player turn indicator
        initializeGame() // reinitialize the game
    })    

    initializeGame() // intializes the game when DOM is fully loaded
})
