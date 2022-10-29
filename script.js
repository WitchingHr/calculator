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

// Get value

let value = '';

function getNumber(e) {
    if (value == '') {
        populateScreen(e.target.textContent);
        return value = e.target.textContent;
    }
    value += e.target.textContent;
    populateScreen(value);
    return value;
}

// Populate screen

const screenBottom = document.querySelector('.screen-bottom');

function populateScreen(num) {
    screenBottom.textContent = num;
}

// Numbers event listeners

const numbers = document.querySelectorAll('.number');

numbers.forEach(number => {
    number.addEventListener('click', getNumber);
})