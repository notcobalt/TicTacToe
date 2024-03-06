// script.js

const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayerClass = X_CLASS;

const board = document.querySelector('.board');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = currentPlayerClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
    statusDisplay.innerText = `Player ${currentPlayerClass.toUpperCase()}'s turn`;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        statusDisplay.innerText = 'It\'s a Draw!';
    } else {
        statusDisplay.innerText = `Player ${currentPlayerClass.toUpperCase()} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

restartButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.addEventListener('click', handleClick, { once: true });
    });
    statusDisplay.innerText = `Player X's turn`;
    currentPlayerClass = X_CLASS;
});

