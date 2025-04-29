console.log('Hello World!');

function add(leftOperand, rightOperand) {
    return leftOperand + rightOperand;
}

function subtract(leftOperand, rightOperand) {
    return leftOperand - rightOperand;
}

function multiply(leftOperand, rightOperand) {
    return leftOperand * rightOperand;
}

function divide(leftOperand, rightOperand) {
    return leftOperand / rightOperand;
}

function operate(operator, leftOperand, rightOperand) {
    switch (operator) {
        case '+': return add(leftOperand, rightOperand);
        case '-': return subtract(leftOperand, rightOperand);
        case '*': return multiply(leftOperand, rightOperand);
        case '/': return divide(leftOperand, rightOperand);
    }
}