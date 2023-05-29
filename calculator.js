let total = '';
let num1 = '';
let operator = '';

let hasOperatorPressed = false;
let equalsPressed = false;

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'point'];
const operators = ['plus', 'minus', 'times', 'divide']

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/': 
            return Number(divide(num1, num2).toFixed(5));
        default:
            alert('No such operator');
    }
}

function resetCalculator() {
    total = '';
    num1 = '';
    operator = '';
    hasOperatorPressed = false;
}

function updateDisplay(text, operator=false) {
    const display = document.querySelector('.display');
    if (operator) {
        displayText = display.textContent + text;
        display.textContent = displayText;
        return;
    }
    display.textContent = text;
}

function handleButtonPress(e) {
    const buttonId = e.target.id;

    if (operators.includes(buttonId) && hasOperatorPressed) {
        alert('ERROR! Can\'t place 2 operators in a row.');
        resetCalculator();
        return;
    }
    
    if (equalsPressed && !operators.includes(buttonId)) {
        resetCalculator();
        equalsPressed = false;
    }
    
    if (numbers.includes(buttonId)) {
        if (buttonId === 'point') {
            if (num1 === '') {
                num1 = '0.';
            } else if (num1.includes('.')) {
                return;
            }
            num1 += '.';
        } else {
            num1 += buttonId;
        }
        updateDisplay(num1);
        hasOperatorPressed = false;
    } else if (operators.includes(buttonId)) {
        equalsPressed = false;
        if (operator) {
            total = operate(total, num1, operator);
            num1 = '';
            updateDisplay(total);
        }
        if (total === '') {
            total = num1;
            num1 = '';
        }
        operator = e.target.classList[1];
        hasOperatorPressed = true;
        updateDisplay(operator, true);
    } else if (buttonId === 'equal') {
        total = operate(total, num1, operator);
        updateDisplay(total);
        num1 = '';
        operator = '';
        equalsPressed = true;
    }
    
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', handleButtonPress);
})

document.addEventListener('keydown', function (event) {
    const key = event.key;
    let buttonId = key === '.' ? 'point' : key;

    switch (key) {
        case '+':
            buttonId = 'plus';
            break;
        case '-':
            buttonId = 'minus';
            break;
        case '*':
            buttonId = 'times';
            break;
        case '/':
            buttonId = 'divide';
            break;
        case 'Enter':
            buttonId = 'equal'
            break;
        default:
            break;
    }

    const button = document.getElementById(buttonId);

    if (button) {
        button.click();
    }
});