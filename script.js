const expression = {
    firstOperand: null,
    operator: null,
    secondOperand: null
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
    if (secondOperand === 0) return 'Cannot divide by 0!';
    return firstOperand / secondOperand;
}