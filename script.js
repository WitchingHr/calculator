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
            return divide(x, y).toFixed(2).replace(/[.]00$/, "");  
    }
}

// Get value

let value = '';

function getNumber(e) {
    if (value == '') {
        populateScreen(e.target.textContent);
        return value = Number(e.target.textContent);
    }
    value += e.target.textContent;
    populateScreen(value);
    return value;
}

// Store value, clear value

let storedValue = '';

function storeValue(value) {
    storedValue = value;
    console.log(storedValue); // remove this
    value = '';
}

// Get operator

let operator = '';

function getOperator(e) {
    operator = e.target.textContent;
    console.log(operator); // remove this
    storeValue(value);
    clearScreen();
}

// Solve

function solve() {
    if (value == '') return value = '';
    value = operate(storedValue, operator, value);
    populateScreen(value);
}

// All clear

function allClear() {
    clearScreen();
    storedValue = '';
    value = '';
    operator = '';
}

// Populate screen

const screenBottom = document.querySelector('.screen-bottom');

function populateScreen(num) {
    screenBottom.textContent = num;
}

// Clear screen

function clearScreen() {
    value = '';
    populateScreen();
}

// Numbers event listeners

const numbers = document.querySelectorAll('.number');

numbers.forEach(number => number.addEventListener('click', getNumber));

// Operators event listeners

const operators = document.querySelectorAll('.operator');

operators.forEach(operator => operator.addEventListener('click', getOperator));

// Equals event listener

const equals = document.querySelector('.equals');

equals.addEventListener('click', solve);

// AC event listener

const ac = document.querySelector('.ac');

ac.addEventListener('click', allClear);