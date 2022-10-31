// Operator functions

function add(x, y) {
    const sum = x + y;
    if (sum.toString().length > 14) {
        return sum.toExponential(6);
    }
    return parseFloat(sum.toFixed(2));
}

function subtract(x, y) {
    const difference = parseFloat(Number(x).toFixed(2) - Number(y).toFixed(2));
    if (difference.toString().length > 14) {
        return difference.toExponential(6);
    }
    return parseFloat(difference.toFixed(2));
}

function multiply(x, y) {
    const product = parseFloat(x * y);
    const rounded = product.toFixed(2);
    if (rounded.toString().length > 14) {
        return Number(rounded).toExponential(6);
    }
    return parseFloat(rounded);
}

function divide(x, y) {
    const quotient = parseFloat(x / y);
    const rounded = quotient.toFixed(2);
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

function getNumberByClick(e) {
    if (value == '') {
        populateBottomScreen(e.target.textContent);
        return value = Number(e.target.textContent);
    }
    if (value.length == 14) return value;
    value += e.target.textContent;
    populateBottomScreen(value);
    return Number(value);
}

function getNumberByKey(number) {
    if (value == '') {
        populateBottomScreen(number);
        return value = Number(number);
    }
    if (value.length == 14) return value;
    value += number;
    populateBottomScreen(value);
    return Number(value);
}

// Decimal

function inputDecimal(e) {
    if (value == '') {
        populateBottomScreen('.');
        return value = '.';
    }
    if (value == '.') return;
    if (value.toString().length == 1) {
        value += '.';
        populateBottomScreen(value);
        return value;
    }
    if (value.toString().split('').some(item => item == '.')) return value;
    value += '.';
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

function getOperatorByClick(e) {
    if (operator === '') {
        operator = e.target.id;
        symbol = e.target.textContent;
    }
    if (storedValue && (value || value === 0)) { // For chaining operations
        solveByOperator();
        clearBottomScreen();
        operator = e.target.id;
        symbol = e.target.textContent;
        populateTopScreen();
    } else {
        storeValue(value);
        clearBottomScreen();
        populateTopScreen(); 
    }
}

function getOperatorByKey(op, sym) {
    if (operator === '') {
        operator = op;
        symbol = sym;
    }
    if (storedValue && value) { // For chaining operations
        solveByOperator();
        clearBottomScreen();
        operator = op;
        symbol = sym;
        populateTopScreen();
    } else {
        storeValue(value);
        clearBottomScreen();
        populateTopScreen(); 
    }
}

// Solve

function solve() {
    if (value == '' && value !== 0) return;
    if (!operator) return;
    value = operate(storedValue, operator, Number(value));
    populateBottomScreen(value);
    clearTopScreen();
    storedValue = '';
    operator = '';
}

function solveByOperator() {
    storedValue = operate(storedValue, operator, Number(value));
    value = '';
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
numbers.forEach(number => number.addEventListener('click', getNumberByClick));

const dec = document.querySelector('.point');
dec.addEventListener('click', inputDecimal);

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', getOperatorByClick));

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

// Keyboard

window.addEventListener('keydown', e => {
    if (e.code === 'Backspace') {
        deleteChar();
        del.classList.add('animate');
    }
    if (e.code === 'Enter') {
        solve();
        equals.classList.add('animate');
    }
    if (e.code === 'Period') {
        inputDecimal();
        dec.classList.add('animate');
    }
    if (e.key === '%') {
        getPercentage();
        percent.classList.add('animate');
    }
    if (e.code === 'Digit1') {
        getNumberByKey('1');
        numbers[6].classList.add('animate');
    }
    if (e.code === 'Digit2') {
        getNumberByKey('2');
        numbers[7].classList.add('animate');
    }
    if (e.code === 'Digit3') {
        getNumberByKey('3');
        numbers[8].classList.add('animate');
    }
    if (e.code === 'Digit4') {
        getNumberByKey('4');
        numbers[3].classList.add('animate');
    }
    if (e.key === '5') {
        getNumberByKey('5');
        numbers[4].classList.add('animate');
    }
    if (e.code === 'Digit6') {
        getNumberByKey('6');
        numbers[5].classList.add('animate');
    }
    if (e.code === 'Digit7') {
        getNumberByKey('7');
        numbers[0].classList.add('animate');
    }
    if (e.key === '8') {
        getNumberByKey('8');
        numbers[1].classList.add('animate');
    }
    if (e.code === 'Digit9') {
        getNumberByKey('9');
        numbers[2].classList.add('animate');
    }
    if (e.code === 'Digit0') {
        getNumberByKey('0');
        numbers[9].classList.add('animate');
    }
    if (e.code === 'Equal') {
        getOperatorByKey('+', '+');
        operators[3].classList.add('animate');
    }
    if (e.code === 'Minus') {
        getOperatorByKey('-', '−');
        operators[2].classList.add('animate');
    }
    if (e.key === '*' ) {
        getOperatorByKey('*', '×');
        operators[1].classList.add('animate');
    }
    if (e.code === 'Slash') {
        getOperatorByKey('/', '÷');
        operators[0].classList.add('animate');
    }
    if (e.code === 'Escape') {
        allClear();
        ac.classList.add('animate');
    }
    if (e.code === 'KeyN') {
        makeNegative();
        neg.classList.add('animate');
    }
});

window.addEventListener('keyup', e => {
    if (e.code === 'Backspace') del.classList.remove('animate');
    if (e.code === 'Enter') equals.classList.remove('animate');
    if (e.code === 'Period') dec.classList.remove('animate');
    if (e.key === '%') percent.classList.remove('animate');
    if (e.code === 'Digit1') numbers[6].classList.remove('animate');
    if (e.code === 'Digit2') numbers[7].classList.remove('animate');
    if (e.code === 'Digit3') numbers[8].classList.remove('animate');
    if (e.code === 'Digit4') numbers[3].classList.remove('animate');
    if (e.key === '5') numbers[4].classList.remove('animate');
    if (e.code === 'Digit6') numbers[5].classList.remove('animate');
    if (e.code === 'Digit7') numbers[0].classList.remove('animate');
    if (e.key === '8') numbers[1].classList.remove('animate');
    if (e.code === 'Digit9') numbers[2].classList.remove('animate');
    if (e.code === 'Digit0') numbers[9].classList.remove('animate');
    if (e.code === 'Equal') operators[3].classList.remove('animate');
    if (e.code === 'Minus') operators[2].classList.remove('animate');
    if (e.key === '*' ) operators[1].classList.remove('animate');
    if (e.code === 'Slash') operators[0].classList.remove('animate');
    if (e.code === 'Escape') ac.classList.remove('animate');
    if (e.code === 'KeyN') neg.classList.remove('animate');
});