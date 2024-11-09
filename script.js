let state = {
    expression: {
        firstOperand: null,
        operator: null,
        secondOperand: null
    },
    displayValue: '',
    freeze: false
}

const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');

calculator.addEventListener('click', event => {
    switch (event.target.id) {
        case '0':
            updateDisplayValue('0');
            break;
        case '1':
            updateDisplayValue('1');
            break;
        case '2':
            updateDisplayValue('2');
            break;
        case '3':
            updateDisplayValue('3');
            break;
        case '4':
            updateDisplayValue('4');
            break;
        case '5':
            updateDisplayValue('5');
            break;
        case '6':
            updateDisplayValue('6');
            break;
        case '7':
            updateDisplayValue('7');
            break;
        case '8':
            updateDisplayValue('8');
            break;
        case '9':
            updateDisplayValue('9');
            break;
        case '+':
            computeExpression('+');
            break;
        case '-':
            computeExpression('-');
            break;
        case '*':
            computeExpression('*');
            break;
        case '/':
            computeExpression('/');
            break;
        case '=':
            computeExpression('=');
            break;
        case 'clear':
        case 'clearText':
            clear();
            break;
    }

    updateExpression();
    updateDisplay();
});


function computeExpression(operator) {
    if (state.expression.firstOperand === null) return;
    state.freeze = true;
    if (state.expression.firstOperand !== null && state.expression.operator !== null && state.expression.secondOperand !== null) {
        state.expression.firstOperand = operate(state.expression.operator, state.expression.firstOperand, state.expression.secondOperand);
        if (operator === '=') {
            state.expression.operator = null;
        } else {
            state.expression.operator = operator;
        }
        state.expression.secondOperand = null;
        state.displayValue = state.expression.firstOperand;
    } else if (state.expression.firstOperand !== null && state.expression.operator === null) {
        state.expression.operator = operator;
    }
}

function updateExpression() {
    if (state.freeze || state.displayValue === '') return;
    const number = Number(state.displayValue);
    if (state.expression.operator === null) {
        state.expression.firstOperand = number;
    } else {
        state.expression.secondOperand = number;
    }
}

function updateDisplayValue(value) {
    if (state.expression.firstOperand !== null && state.expression.operator !== null && state.expression.secondOperand === null) {
        state.displayValue = value;
    } else {
        state.displayValue += value;
    }
}

function updateDisplay() {
    console.log(state)
    state.freeze = false;
    display.innerText = state.displayValue;
}

function clear() {
    state.expression.firstOperand = null;
    state.expression.operator = null;
    state.expression.secondOperand = null;
    state.displayValue = '';
    state.freeze = false;
}

function operate(operator, firstOperand, secondOperand) {
    switch (operator) {
        case '+': return add(firstOperand, secondOperand);
        case '-': return subtract(firstOperand, secondOperand);
        case '*': return multiply(firstOperand, secondOperand);
        case '/': return divide(firstOperand, secondOperand);
    }
}

function add(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
    return firstOperand / secondOperand;
}