// Operator functions

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(x, operator, y) {
    switch (operator) {
        case '+' :
            return add(x, y);
        case '-' :
            return subtract(x, y);
        case '*' :
            return multiply(x, y);
        case '/' :
            return divide(x, y);    
    }
}

// Populate screen

const screen = document.querySelector('.screen');

function populateScreen(e) {
    screen.textContent = e.target.textContent;
}

// Numbers event listeners

const numbers = document.querySelectorAll('.number');

numbers.forEach(number => number.addEventListener('click', populateScreen))

function getNumber(e) {
    return e.target.textContent;
}