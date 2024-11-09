let state = {
    expression: {
        firstOperand: null,
        operator: null,
        secondOperand: null
    },
    displayValue: '',
    freeze: false
}

const OPERATORS = ['+', '-', '*', '/', '='];
const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');

calculator.addEventListener('click', event => {
    const id = event.target.id;
    if (!isNaN(id)) updateDisplayValue(id);
    else if (OPERATORS.includes(id)) computeExpression(id);
    else if (id === 'clear' || id === 'clearText') clear();
    updateExpression();
    updateDisplay();
});

function computeExpression(operator) {
    if (state.expression.firstOperand === null) return;
    state.freeze = true;
    if (state.expression.firstOperand !== null && state.expression.operator !== null && state.expression.secondOperand !== null) {
        state.expression.firstOperand = operate(state.expression.operator, state.expression.firstOperand, state.expression.secondOperand);
        state.expression.operator = operator === '=' ? null : operator;
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