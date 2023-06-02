let total = '';
let num1 = '';
let operator = '';

let hasOperatorPressed = false;
let equalsPressed = false;

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'point'];
const operators = ['plus', 'minus', 'times', 'divide']

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0) {
                alert(`Can't divide a number by 0!`);
                resetCalculator();
                return;
            }
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
    equalsPressed = false;
    updateDisplay('');
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

function animateButton(buttonId) {
    const button = document.getElementById(buttonId);

    button.classList.add('button-clicked');

    setTimeout(() => {
        button.classList.remove('button-clicked');
    }, 200);
}

function handleButtonPress(e) {
    const buttonId = e.target.id;

    if (operators.includes(buttonId) && hasOperatorPressed) {
        alert('ERROR! Can\'t place 2 operators in a row.');
        resetCalculator();
    }

    if (num1.length == 7 && !operators.includes(buttonId)) return;

    animateButton(buttonId);

    if (equalsPressed && !operators.includes(buttonId)) resetCalculator();
    
    if (numbers.includes(buttonId)) {
        if (buttonId === 'point' && !num1.includes('.')) {
            num1 = num1 === '' ? '0.' : num1 + '.';
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

function keyboardInputHandler(e) {
    const keyMap = {
        '+': 'plus',
        '-': 'minus',
        '*': 'times',
        '/': 'divide',
        Enter: 'equal',
        '.': 'point',
    };
  
    const buttonId = keyMap[e.key] || e.key;
    const button = document.getElementById(buttonId);
    if (button) {
        button.click();
    }
}
  
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', handleButtonPress);
})
const reset = document.querySelector('.reset');
reset.addEventListener('click', resetCalculator);
document.addEventListener('keydown', keyboardInputHandler);