const state = {
    expression: { leftOperand: null, operator: null, rightOperand: null },
    displayValue: '',
    forceClear: false,
}

const OPERATORS = ['+', '-', '*', '/', '='];
const calculator = document.querySelector('#calculator');
const display = document.querySelector('#displayText');
const decimal = document.querySelector('#decimal');

calculator.addEventListener('click', event => {
    if (state.forceClear) { onClearHandler(); }

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
    else if (id === 'decimal') {
        onDigitInputHandler('.');
    }

    dumpState();
    renderView();
});

function onOperatorInputHandler(operator) {
    const expression = state.expression;
    if (expression.leftOperand !== null && expression.operator !== null && expression.rightOperand !== null) {
        try {
            expression.leftOperand = operate(expression.operator, expression.leftOperand, expression.rightOperand);
            expression.operator = null;
            expression.rightOperand = null;
            state.displayValue = round(expression.leftOperand).toString();
        } catch (error) {
            state.displayValue = error.message;
            state.forceClear = true;
        }
    }
    if (expression.leftOperand !== null && expression.operator === null && operator !== '=') {
        expression.operator = operator;
    }
}

function onDigitInputHandler(digit) {
    if (digit === '.' && isDecimalDisabled()) {
        return;
    }
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

function isDecimalDisabled() {
    return state.displayValue.includes('.') || state.displayValue.length === 0;
}

function renderView() {
    display.innerText = state.displayValue;
    if (isDecimalDisabled()) {
        decimal.classList.add('disabled');
    } else {
        decimal.classList.remove('disabled');
    }
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

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
function round(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

function operate(operator, leftOperand, rightOperand) {
    switch (operator) {
        case '+': return leftOperand + rightOperand;
        case '-': return leftOperand - rightOperand;
        case '*': return leftOperand * rightOperand;
        case '/':
            if (rightOperand === 0) {
                throw new RangeError('MATH ERROR');
            } else {
                return leftOperand / rightOperand;
            }
    }
}