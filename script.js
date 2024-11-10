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
    operators: ['plus', 'minus', 'times', 'divide'].reduce((acc, op) => {
        acc[op] = document.querySelector(`#${op}`);
        return acc;
    }, {})
};

ui.calculator.addEventListener('click', event => {
    if (state.forceClear) onClearHandler();

    const { id } = event.target;

    if (!isNaN(id)) onDigitInputHandler(id);
    else if (calculator.operators.includes(id)) onOperatorInputHandler(id);
    else if (id === 'clear' || id === 'clearText') onClearHandler();
    else if (id === 'decimal') onDigitInputHandler('.');

    dumpState();
    renderView();
});

function onOperatorInputHandler(operator) {
    const { expression } = state;
    const { a, b, operator: exprOp } = expression;

    if (a !== null && exprOp && b !== null) {
        try {
            expression.a = calculator.operations[exprOp](a, b);
            Object.assign(expression, { operator: null, b: null });
            state.displayValue = round(expression.a).toString();
        } catch (error) {
            state.displayValue = error.message;
            state.forceClear = true;
        }
    }
    if (a !== null && !exprOp && operator !== 'equals') expression.operator = operator;
}

function onDigitInputHandler(digit) {
    if (digit === '.' && isDecimalDisabled()) return;
    const { expression } = state;
    const { a, operator, b } = expression;

    updateDisplayValue(digit, operator ? b === null : a === null);
    if (!operator) expression.a = Number(state.displayValue);
    else expression.b = Number(state.displayValue);
}

function updateDisplayValue(value, reset) {
    state.displayValue = reset ? value : state.displayValue + value;
}

function isDecimalDisabled() {
    const { displayValue, expression } = state;
    return !displayValue || displayValue.includes('.') || (expression.operator && expression.b === null);
}

function renderView() {
    ui.display.innerText = state.displayValue;
    ui.decimal.classList.toggle('disabled', isDecimalDisabled());
    Object.values(ui.operators).forEach(op => op.classList.remove('highlight'));
    if (state.expression.operator in ui.operators) ui.operators[state.expression.operator].classList.add('highlight');
}

function onClearHandler() {
    state.expression = { a: null, operator: null, b: null };
    state.displayValue = '';
    state.forceClear = false;
}

// Utilisé pour le debug
function dumpState() {
    console.log(state);
}

function round(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}