// Operator functions

function add(x, y) {
    const sum = Number(x) + Number(y);
    if (sum.toString().length > 14) {
        return sum.toExponential(6);
    }
    return parseFloat(x + y);
}

function subtract(x, y) {
    const difference = x - y;
    if (difference.toString().length > 14) {
        return difference.toExponential(6);
    }
    return parseFloat(x - y);
}

function multiply(x, y) {
    const product = x * y;
    if (product.toString().length > 14) {
        return product.toExponential(6);
    }
    return parseFloat(x * y).toFixed(3);
}

function divide(x, y) {
    const quotient = x / y;
    if (quotient.toString().length > 14) {
        return quotient.toExponential(6);
    }
    return parseFloat(x / y).toFixed(3);
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

// Get value

let value = '';

function getNumber(e) {
    if (value == '') {
        populateScreen(e.target.textContent);
        return value = Number(e.target.textContent);
    }
    if (value.length == 14) return value;
    value += e.target.textContent;
    populateScreen(value);
    return Number(value);
}

// Decimal

function inputDecimal(e) {
    if (value == '') {
        populateScreen(e.target.textContent);
        return value = e.target.textContent;
    }
    if (value.toString().length == 1) {
        value += e.target.textContent;
        populateScreen(value);
        return value;
    }
    if (value.toString().split('').some(item => item == '.')) return value;
    value += e.target.textContent;
    populateScreen(value);
    return value;
}

// Percentage 

function getPercentage() {
    value /= 100;
    if (value.toString().length > 14) {
        value = value.toExponential(3);
    }
    populateScreen(value);
    return value;
}

// Delete

function deleteChar() {
    const array = value.toString().split('');
    array.pop();
    value = array.join('');
    populateScreen(value);
    return value;
}

// Negative

function makeNegative() {
    if (value > 0) {
        value = -Number(value);
        populateScreen(value);
        return value;
    }
    if (value < 0) {
        value = -Number(value);
        populateScreen(value);
        return value;
    }
}

// Store value, clear value

let storedValue = '';

function storeValue(value) {
    storedValue = Number(value);
    value = '';
}

// Get operator

let operator = '';
let symbol = '';

function getOperator(e) {
    operator = e.target.id;
    symbol = e.target.textContent;
    storeValue(value);
    clearScreen();
    populateTop();
}

// Solve

function solve() {
    if (value == '') return value = '';
    value = operate(storedValue, operator, value);
    populateScreen(value);
    clearTop();

}

// All clear

function allClear() {
    clearScreen();
    clearTop();
    storedValue = '';
    value = '';
    operator = '';
}

// Populate bottom-screen

const screenBottom = document.querySelector('.screen-bottom');

function populateScreen(num) {
    screenBottom.textContent = num;
}

// Populate top-screen

const screenTop = document.querySelector('.screen-top');

function populateTop() {
    screenTop.textContent = `${storedValue} ${symbol}`;
}

// Clear screen

function clearScreen() {
    value = '';
    populateScreen();
}

// Clear top

function clearTop() {
    screenTop.textContent = '';
}

// Numbers event listener

const numbers = document.querySelectorAll('.number');

numbers.forEach(number => number.addEventListener('click', getNumber));

// Decimal event listener

const dec = document.querySelector('.point');

dec.addEventListener('click', inputDecimal);

// Operators event listener

const operators = document.querySelectorAll('.operator');

operators.forEach(operator => operator.addEventListener('click', getOperator));

// Equals event listener

const equals = document.querySelector('.equals');

equals.addEventListener('click', solve);

// AC event listener

const ac = document.querySelector('.ac');

ac.addEventListener('click', allClear);

// Percent event listener

const percent = document.querySelector('.percent');

percent.addEventListener('click', getPercentage);

// Delete event listener

const del = document.querySelector('.delete');

del.addEventListener('click', deleteChar);

// Negative event listener

const neg = document.querySelector('.negative');

neg.addEventListener('click', makeNegative);