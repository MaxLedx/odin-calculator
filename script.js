const state = {
    expression: {
        leftOperand: null,
        operator: null,
        rightOperand: null
    },
    displayValue: ''
}

const OPERATORS = ['+', '-', '*', '/', '='];
const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');

calculator.addEventListener('click', event => {
    const id = event.target.id;

    if (!isNaN(id)) {
        onDigitInputHandler(id);
    }
    else if (OPERATORS.includes(id)) {
        onOperatorInputHandler(id);
    }
    else if (id === 'clear' || id === 'clearText') {
        onClearHandler();
    }

    dumpState();
    render();
});

function onOperatorInputHandler(operator) {
    const expression = state.expression;
    if (expression.leftOperand !== null && expression.operator !== null && expression.rightOperand !== null) {
        expression.leftOperand = operate(expression.operator, expression.leftOperand, expression.rightOperand);
        expression.operator = null;
        expression.rightOperand = null;
        state.displayValue = `${state.expression.leftOperand}`;
    }
    if (expression.operator === null && operator !== '=') {
        expression.operator = operator;
    }
}

function onDigitInputHandler(digit) {
    const expression = state.expression;
    if (expression.operator === null) {
        updateDisplayValue(digit, expression.leftOperand === null);
        expression.leftOperand = Number(state.displayValue);
    } else {
        updateDisplayValue(digit, expression.rightOperand === null);
        expression.rightOperand = Number(state.displayValue);
    }
}

function updateDisplayValue(value, mustReset) {
    if (mustReset) {
        state.displayValue = value;
    } else {
        state.displayValue += value;
    }
}

function render() {
    display.innerText = state.displayValue;
}

function onClearHandler() {
    state.expression.leftOperand = null;
    state.expression.operator = null;
    state.expression.rightOperand = null;
    state.displayValue = '';
}

// Use for debug
function dumpState() {
    console.log(state);
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