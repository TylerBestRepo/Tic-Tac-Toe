
// Establishing the game board as an object 

const gameBoard = (() => {
    let board = new Array(9);
    let player1Turn = true;

    let changeTurn = () => {
        player1Turn = !player1Turn
    }

    const getPlayerTurn = () => {
        return player1Turn;
    }

    let newMove = (boardPosition) => {
        if (player1Turn) {
            board[boardPosition] = "p1"
            console.log(board)
        } else {
            board[boardPosition] = "p2"
            console.log(board)
        }
    }
    return {board, changeTurn, newMove, getPlayerTurn};
})();

console.log(gameBoard.board.length)

const Player = (name) => {
    let moves = []
    // Some code that adds the move done will be placed here
    const addMove = (move) => {
        moves.append(move);
    }
    return {name, moves, addMove}
}

player1 = Player('Tyler');
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
    console.log(e.target.id);
    idString = e.target.id; 
    const splitID = idString.split("-")
    // Minus one is necessary as block 1 is index 0 in a list
    gameBoard.newMove(parseInt(splitID[1])-1);
    // Change the colour of that element
    p1Turn = gameBoard.getPlayerTurn();
    if (p1Turn) {
        document.getElementById(idString).style.backgroundColor = "blue";
    } else {
        document.getElementById(idString).style.backgroundColor = "red";
    }
    // Tell the game that it is now the other players turn
    gameBoard.changeTurn();

    
}

for (let block of blocks) {
    block.addEventListener("click", blockClicked);
}

