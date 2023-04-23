const ROWS = 10;
const COLS = 10;
const NUM_MINES = 10;

var board = [];
var revealedBoard = [];

function init() {
    for (var row = 0; row < ROWS; row++) {
        board[row] = [];
        revealedBoard[row] = [];
        for (var col = 0; col < COLS; col++) {
            board[row][col] = 0;
            revealedBoard[row][col] = false;
        }
    }
    var numMinesPlaced = 0;
    while (numMinesPlaced < NUM_MINES) {
        var row = Math.floor(Math.random() * ROWS);
        var col = Math.floor(Math.random() * COLS);
        if (board[row][col] != -1) {
            board[row][col] = -1;
            numMinesPlaced++;
        }
    }
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (board[row][col] != -1) {
                var count = 0;
                if (row > 0 && col > 0 && board[row - 1][col - 1] == -1) count++;
                if (row > 0 && board[row - 1][col] == -1) count++;
                if (row > 0 && col < COLS - 1 && board[row - 1][col + 1] == -1) count++;
                if (col > 0 && board[row][col - 1] == -1) count++;
                if (col < COLS - 1 && board[row][col + 1] == -1) count++;
                if (row < ROWS - 1 && col > 0 && board[row + 1][col - 1] == -1) count++;
                if (row < ROWS - 1 && board[row + 1][col] == -1) count++;
                if (row < ROWS - 1 && col < COLS - 1 && board[row + 1][col + 1] == -1) count++;
                board[row][col] = count;
            }
        }
    }
    var table = document.getElementById("board");
    for (var row = 0; row < ROWS; row++) {
        var tr = document.createElement("tr");
        for (var col = 0; col < COLS; col++) {
            var td = document.createElement("td");
            td.setAttribute("data-row", row);
            td.setAttribute("data-col", col);
            td.addEventListener("click", clickHandler);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function clickHandler(event) {
    var row = event.target.getAttribute("data-row");
    var col = event.target.getAttribute("data-col");
    console.log("click  Handler....", event, revealedBoard, row, col)
    if (revealedBoard[row][col]) {
        return;
    }
    revealedBoard[row][col] = true;
    var td = event.target;
    td.classList.add("revealed");
    if (board[row][col] == -1) {
        td.textContent = "X";
        alert("你输了！");
        revealBoard();
    } else if (board[row][col] == 0) {
        revealEmptyCells(row, col);
        if (checkWin()) {
            alert("你赢了！");
            revealBoard();
        }
    } else {
        td.textContent = board[row][col];
        if (checkWin()) {
            alert("你赢了！");
            revealBoard();
        }
    }
}

function revealEmptyCells(row, col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS || revealedBoard[row][col]) {
        return;
    }
    revealedBoard[row][col] = true;
    var td = document.querySelector("[data-row='" + row + "'][data-col='" + col + "']");
    td.classList.add("revealed");
    if (board[row][col] == 0) {
        revealEmptyCells(row - 1, col - 1);
        revealEmptyCells(row - 1, col);
        revealEmptyCells(row - 1, col + 1);
        revealEmptyCells(row, col - 1);
        revealEmptyCells(row, col + 1);
        revealEmptyCells(row + 1, col - 1);
        revealEmptyCells(row + 1, col);
        revealEmptyCells(row + 1, col + 1);
    } else {
        td.textContent = board[row][col];
    }
}

function checkWin() {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (board[row][col] != -1 && !revealedBoard[row][col]) {
                return false;
            }
        }
    }
    return true;
}

function revealBoard() {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            var td = document.querySelector("[data-row='" + row + "'][data-col='" + col + "']");
            td.classList.add("revealed");
            if (board[row][col] == -1) {
                td.textContent = "X";
            } else {
                td.textContent = board[row][col];
            }
        }
    }
}

init();
