// Operator functions

function add(x, y) {
    const sum = x + y;
    if (sum.toString().length > 14) {
        return sum.toExponential(6);
    }
    return parseFloat(sum);
}

function subtract(x, y) {
    const difference = x - y;
    if (difference.toString().length > 14) {
        return difference.toExponential(6);
    }
    return parseFloat(difference);
}

function multiply(x, y) {
    const product = parseFloat(x * y);
    const rounded = product.toFixed(4);
    if (rounded.toString().length > 14) {
        return Number(rounded).toExponential(6);
    }
    return parseFloat(rounded);
}

function divide(x, y) {
    const quotient = parseFloat(x / y);
    const rounded = quotient.toFixed(4);
    if (rounded.toString().length > 14) {
        return Number(rounded).toExponential(6);
    }
    return parseFloat(rounded);
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
        populateBottomScreen(e.target.textContent);
        return value = Number(e.target.textContent);
    }
    if (value.length == 14) return value;
    value += e.target.textContent;
    populateBottomScreen(value);
    return Number(value);
}

// Decimal

function inputDecimal(e) {
    if (value == '') {
        populateBottomScreen(e.target.textContent);
        return value = e.target.textContent;
    }
    if (value.toString().length == 1) {
        value += e.target.textContent;
        populateBottomScreen(value);
        return value;
    }
    if (value.toString().split('').some(item => item == '.')) return value;
    value += e.target.textContent;
    populateBottomScreen(value);
    return value;
}

// Percentage 

function getPercentage() {
    value /= 100;
    if (value.toString().length > 14) {
        value = value.toExponential(6);
    }
    populateBottomScreen(value);
    return value;
}

// Negative

function makeNegative() {
    if (value > 0) {
        value = -Number(value);
        populateBottomScreen(value);
        return value;
    }
    if (value < 0) {
        value = -Number(value);
        populateBottomScreen(value);
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
    clearBottomScreen();
    populateTopScreen();
}

// Solve

function solve() {
    if (value == '') return value = '';
    value = operate(storedValue, operator, Number(value));
    populateBottomScreen(value);
    clearTopScreen();

}

// Delete

function deleteChar() {
    const array = value.toString().split('');
    array.pop();
    value = array.join('');
    populateBottomScreen(value);
    return value;
}

// All clear

function allClear() {
    clearBottomScreen();
    clearTopScreen();
    storedValue = '';
    value = '';
    operator = '';
}

// Screen

const screenTop = document.querySelector('.screen-top');
const screenBottom = document.querySelector('.screen-bottom');

function populateTopScreen() {
    screenTop.textContent = `${storedValue} ${symbol}`;
}

function populateBottomScreen(num) {
    screenBottom.textContent = num;
}

function clearTopScreen() {
    screenTop.textContent = '';
}

function clearBottomScreen() {
    value = '';
    populateBottomScreen();
}

// Event listeners

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', getNumber));

const dec = document.querySelector('.point');
dec.addEventListener('click', inputDecimal);

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', getOperator));

const equals = document.querySelector('.equals');
equals.addEventListener('click', solve);

const ac = document.querySelector('.ac');
ac.addEventListener('click', allClear);

const percent = document.querySelector('.percent');
percent.addEventListener('click', getPercentage);

const del = document.querySelector('.delete');
del.addEventListener('click', deleteChar);

const neg = document.querySelector('.negative');
neg.addEventListener('click', makeNegative);