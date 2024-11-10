const state = {
    expression: {
        leftOperand: null,
        operator: null,
        rightOperand: null
    },
    displayValue: '',
    forceClear: false,
}

const MAX_DISPLAYED_CHARACTERS = 10;
const OPERATORS = ['+', '-', '*', '/', '='];
const calculator = document.querySelector('#calculator');
const display = document.querySelector('#displayText');

calculator.addEventListener('click', event => {
    if (state.forceClear) {
        onClearHandler();
    }

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
    renderView();
});

function onOperatorInputHandler(operator) {
    const expression = state.expression;
    if (expression.leftOperand !== null && expression.operator !== null && expression.rightOperand !== null) {
        if (expression.operator === '/' && expression.rightOperand === 0) {
            expression.leftOperand = null
            expression.operator = null;
            expression.rightOperand = null;
            state.displayValue = 'ERROR';
            state.forceClear = true;
        } else {
            expression.leftOperand = operate(expression.operator, expression.leftOperand, expression.rightOperand);
            expression.operator = null;
            expression.rightOperand = null;
            state.displayValue = round(state.expression.leftOperand).toString();
        }
    }
    if (expression.leftOperand !== null && expression.operator === null && operator !== '=') {
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
    } else if (state.displayValue.length < MAX_DISPLAYED_CHARACTERS) {
        state.displayValue += value;
    }
}

function renderView() {
    display.innerText = state.displayValue;
}

function round(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

function onClearHandler() {
    state.expression.leftOperand = null;
    state.expression.operator = null;
    state.expression.rightOperand = null;
    state.displayValue = '';
    state.forceClear = false;
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