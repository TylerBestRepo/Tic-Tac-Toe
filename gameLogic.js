
// Establishing the game board as an object 

const gameBoard = (() => {
    let board = new Array(9);
    let player1Turn = true;

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
    
    const hasMoveBeenDone = (boardPosition) => {
        if (board[boardPosition] == "p1" || board[boardPosition] == "p2") {
            return true;
        } else return false
    }

    const gameOverTest = () => {
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

    return {board, changeTurn, newMove, getPlayerTurn, hasMoveBeenDone, gameOverTest, gameOver};
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
    
        // Run a check on the gameboard to see if anyone has won yet
        [winner,overBool] = gameBoard.gameOverTest()
        if (overBool) {
            console.log("The test was successful and the game should be over");
            gameBoard.gameOver = overBool;
            // removing the hover class from the blocks
            var blocks = document.getElementsByClassName('gameBlocks');
            for (let block of blocks) {
                block.classList.remove('hoverClass');
            }
            let winnertext = document.getElementById('winnerText');

            winnertext.innerHTML = `Congratulations to ${winner} for winning the match!`
        }
    }
    
}

for (let block of blocks) {
    block.addEventListener("click", blockClicked);
}


const resultsList = document.getElementById('results')
new URLSearchParams(window.location.search).forEach((value,
    name) => {
        resultsList.append(`${name}: ${value}`)
        resultsList.append(document.createElement('br'))
    })