const state = {
    expression: { a: null, operator: null, b: null },
    displayValue: '',
    forceClear: false,
};

const calculator = {
    operators: ['plus', 'minus', 'times', 'divide', 'equals'],
    operations: {
        plus: (a, b) => a + b,
        minus: (a, b) => a - b,
        times: (a, b) => a * b,
        divide: (a, b) => {
            if (b === 0) throw new RangeError('MATH ERROR');
            return a / b;
        },
    },
};

const ui = {
    calculator: document.querySelector('#calculator'),
    display: document.querySelector('#displayText'),
    decimal: document.querySelector('#decimal'),
    backspace: document.querySelector('#backspace'),
    operators: ['plus', 'minus', 'times', 'divide'].reduce((acc, op) => {
        acc[op] = document.querySelector(`#${op}`);
        return acc;
    }, {}),
    operatorKeys: {
        '+': 'plus',
        '-': 'minus',
        '*': 'times',
        '/': 'divide',
        '=': 'equals',
        'Enter': 'equals'
    }
};

document.addEventListener('keydown', event => {
    if (state.forceClear) onClearHandler();
    const key = event.key;
    if (key.toLowerCase() === 'c') onClearHandler();
    if (!isNaN(key) || key === '.') onDigitInputHandler(key);
    if (key in ui.operatorKeys) onOperatorInputHandler(ui.operatorKeys[key]);
    if (key === 'Backspace' || key === 'Delete') onBackspaceHandler();

    renderView();
});

ui.calculator.addEventListener('click', event => {
    if (state.forceClear) onClearHandler();
    const id = event.target.id;
    if (!isNaN(id)) onDigitInputHandler(id);
    else if (calculator.operators.includes(id)) onOperatorInputHandler(id);
    else if (id === 'clear' || id === 'clearText') onClearHandler();
    else if (id === 'decimal') onDigitInputHandler('.');
    else if (id === 'backspace') onBackspaceHandler();

    renderView();
});

function onOperatorInputHandler(operator) {
    const expression = state.expression;
    if (expression.a !== null && expression.operator !== null && expression.b !== null) {
        try {
            expression.a = calculator.operations[expression.operator](expression.a, expression.b);
            expression.operator = null;
            expression.b = null;
            state.displayValue = round(expression.a).toString();
        } catch (error) {
            state.displayValue = error.message;
            state.forceClear = true;
        }
    }
    if (expression.a !== null && expression.operator === null && operator !== 'equals') {
        expression.operator = operator;
    }
}

function onDigitInputHandler(digit) {
    if (digit === '.' && isDecimalDisabled()) return;
    const expression = state.expression;
    if (expression.operator === null) {
        updateDisplayValue(digit, expression.a === null);
        expression.a = Number(state.displayValue);
    } else {
        updateDisplayValue(digit, expression.b === null);
        expression.b = Number(state.displayValue);
    }
}

function onBackspaceHandler() {
    if (isBackspaceDisabled()) return;
    state.displayValue = state.displayValue.slice(0, -1) || '';
    if (state.expression.operator) {
        state.expression.b = Number(state.displayValue) || null;
    } else {
        state.expression.a = Number(state.displayValue) || null;
    }
}

function updateDisplayValue(value, reset) {
    state.displayValue = reset ? value : state.displayValue + value;
}

function isDecimalDisabled() {
    const { displayValue, expression } = state;
    return !displayValue || displayValue.includes('.') || (expression.operator && expression.b === null);
}

function isBackspaceDisabled() {
    return state.expression.operator && state.expression.b === null;
}

function renderView() {
    ui.display.innerText = state.displayValue;
    ui.decimal.classList.toggle('disabled', isDecimalDisabled());
    ui.backspace.classList.toggle('disabled', isBackspaceDisabled());
    Object.values(ui.operators).forEach(op => op.classList.remove('highlight'));
    if (state.expression.operator in ui.operators) ui.operators[state.expression.operator].classList.add('highlight');
}

function onClearHandler() {
    state.expression.a = null;
    state.expression.operator = null;
    state.expression.b = null;
    state.displayValue = '';
    state.forceClear = false;
}

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
function round(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}