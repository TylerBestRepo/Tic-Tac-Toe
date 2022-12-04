
// Establishing the game board as an object 

const gameBoard = (() => {
    let board = Array.apply(null, Array(9));
    let player1Turn = true;
    let isGameTied = false;
    let firstClick = true;

    let gameOver = false;

    let changeTurn = () => {
        player1Turn = !player1Turn
    }

    const getPlayerTurn = () => {
        return player1Turn;
    }

    const newMove = (boardPosition) => {
        if (player1Turn) {
            board[boardPosition] = "p1"
            console.log(board)
        } else {
            board[boardPosition] = "p2"
            console.log(board)
        }
    }

    const emptyBoardPositions = () => {
        const emptyPositions = board.reduce((acc, curr, index) => {
            if (curr == null){
                acc.push(index);
            }
            return acc;
        }
        , []);
        return emptyPositions;
    }
    
    const hasMoveBeenDone = (boardPosition) => {
        if (board[boardPosition] == "p1" || board[boardPosition] == "p2") {
            return true;
        } else return false
    }

    const gameOverTest = () => {
        // want to quickly test if the gameboard is completely filled for a tie first
        let counter = 0
        board.forEach((index) => {
            if (index == null) {
                isGameTied = false
            } else {counter++}
        });
        if (counter == 9) {
            isGameTied = true;
            return ["tie", true]
        }

        // all horizontal wins
        if (board[0] == "p1" && board[1] == "p1" && board[2] == "p1") {
            return ["p1", true]
        }
        else if (board[0] == "p2" && board[1] == "p2" && board[2] == "p2") {
            return ["p2", true]
        }
        else if (board[3] == "p1" && board[4] == "p1" && board[5] == "p1") {
            return ["p1", true]
        }
        else if (board[3] == "p2" && board[4] == "p2" && board[5] == "p2") {
            return ["p2", true]
        }
        else if (board[6] == "p1" && board[7] == "p1" && board[8] == "p1") {
            return ["p1", true]
        }
        else if (board[6] == "p2" && board[7] == "p2" && board[8] == "p2") {
            return ["p2", true]
        }
        // vertical wins
        else if (board[0] == "p1" && board[3] == "p1" && board[6] == "p1") {
            return ["p1", true]
        }
        else if (board[0] == "p2" && board[3] == "p2" && board[6] == "p2") {
            return ["p2", true]
        }
        else if (board[1] == "p1" && board[4] == "p1" && board[7] == "p1") {
            return ["p1", true]
        }
        else if (board[1] == "p2" && board[4] == "p2" && board[7] == "p2") {
            return ["p2", true]
        }
        else if (board[2] == "p1" && board[5] == "p1" && board[8] == "p1") {
            return ["p1", true]
        }
        else if (board[2] == "p2" && board[5] == "p2" && board[8] == "p2") {
            return ["p2", true]
        }
        // Diagonal wins
        else if (board[0] == "p1" && board[4] == "p1" && board[8] == "p1") {
            return ["p1", true]
        }
        else if (board[0] == "p2" && board[4] == "p2" && board[8] == "p2") {
            return ["p2", true]
        }
        else if (board[2] == "p1" && board[4] == "p1" && board[6] == "p1") {
            return ["p1", true]
        }
        else if (board[2] == "p2" && board[4] == "p2" && board[6] == "p2") {
            return ["p2", true]
        }
        else return ["NA",false]
    }

    return {board, changeTurn, newMove, getPlayerTurn, hasMoveBeenDone, gameOverTest, emptyBoardPositions, gameOver, firstClick};
})();

const Player = (name) => {
    let moves = []
    // Some code that adds the move done will be placed here
    const addMove = (move) => {
        moves.append(move);
    }
    return {name, moves, addMove}
}

player1 = Player('User');
player2 = Player('Random clicks');

// Setting the vs text
const vsInfo = document.getElementById('vsInfo');
let vsString = `${player1.name} vs ${player2.name}! GAME ON!`;
vsInfo.innerHTML = vsString;
console.log(vsString);

// Registering clicks for the different sections of the board
var blocks = document.getElementsByClassName('gameBlocks');
let i = 0;

function gameOver(overBool, message) {
    gameBoard.gameOver = overBool;
    // removing the hover class from the blocks
    var blocks = document.getElementsByClassName('gameBlocks');
    for (let block of blocks) {
        block.classList.remove('hoverClass');
    }
    let winnertext = document.getElementById('winnerText');
    winnertext.innerHTML = message;
}

const blockClicked = e => {

    if (gameBoard.gameOver == false) {
        console.log(e.target.id);
        idString = e.target.id; 
        const splitID = idString.split("-")
        movePos = (parseInt(splitID[1])-1);
        // Before adding a new move to the lists and displaying it, 
        //need to check if that move has already been done
        hasMoveBeenDone = gameBoard.hasMoveBeenDone(movePos);
        if (hasMoveBeenDone) {
            console.log("Press a square that hasnt been selected yet!")
            return
        } else {
            // Minus one is necessary as block 1 is index 0 in a list
            gameBoard.newMove(movePos);
            // Change the colour of that element
            // Checking whose turn it currently is
            p1Turn = gameBoard.getPlayerTurn();
            if (p1Turn) {
                document.getElementById(idString).style.backgroundColor = "blue";
            } else {
                document.getElementById(idString).style.backgroundColor = "red";
            }
            // Tell the game that it is now the other players turn
            gameBoard.changeTurn();
        }

        const whoseTurn = document.getElementById('instructions');
        let player1Turn = gameBoard.getPlayerTurn()
        if (player1Turn) {
            whoseTurn.innerHTML = `${player1.name}'s turn`
        } else {whoseTurn.innerHTML = `${player2.name}'s turn`}
    
        // Run a check on the gameboard to see if anyone has won yet
        [winner,overBool] = gameBoard.gameOverTest()
        
        if (winner == "tie") {
            console.log("The test was successful and the game should be tied");
            gameOver(overBool, "Sucked in, nobody wins in a tie!");
        } 
        // If a player has won the game
        if (overBool) {
            console.log("The test was successful and the game should be over");
            if (winner == "p1") {
                gameOver(overBool, `Congratulations to ${player1.name}, you have won the game!`);
            }
            else {
                gameOver(overBool, `Congratulations to ${player2.name}, you have won the game!`);
            }
        }
        // whoseTurn = gameBoard.getPlayerTurn;
        if ((player2.name == "Computer") && (gameBoard.getPlayerTurn() == false)) {
            // Since player 2 is the computer we want to select a random empty cell for the computers turn
            emptyIndexes = gameBoard.emptyBoardPositions();
            // We now have the list of empty indexes. Now to select a random value from that list
            const randomMove = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
            gameBoard.newMove(randomMove)
            // Need to update the board now
            let idString = 'block-' + (randomMove + 1);
            document.getElementById(idString).style.backgroundColor = "red";
            gameBoard.changeTurn();
        }
    }
    
}

for (let block of blocks) {
    block.addEventListener("click", blockClicked);
}

let instructions = document.getElementById('instructions');
let blueColour = document.getElementById('blueColour');
let redColour = document.getElementById('redColour');

const resultsList = document.getElementById('results')
new URLSearchParams(window.location.search).forEach((value,
    name) => {
        if (name == "player1") {
            player1.name = value;
        } else if (name == "player2") {
            player2.name = value;
        }
        let vsString = `${player1.name} vs ${player2.name}! GAME ON!`;
        vsInfo.innerHTML = vsString;

        instructions.innerHTML = `${player1.name} goes first`
        blueColour.innerHTML = `Blue = ${player1.name}`
        redColour.innerHTML = `Red = ${player2.name}`
    })