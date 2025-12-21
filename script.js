function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            if(num2 === 0) return "DIVIDE BY 0 ERROR";
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}

function getOperator(equation) {
    const operators = ["+", "-", "*", "/"];
    let validEquation = false;
    for (operator of operators) {
        if(equation.includes(operator) && (equation.indexOf(operator) === equation.lastIndexOf(operator))) {
            validEquation = true;
            break;
        }
    }
    if (validEquation) {
        return operator;
    }
    return "ERROR";
}

function breakDownEquation(equation) {
    const operator = getOperator(equation);
    if (operator === "ERROR") {
        return "ERROR";
    }
    const numbers = equation.split(operator);
    if (   isNaN(parseFloat(numbers[0]))
        || isNaN(parseFloat(numbers[1]))) {
        return "ERROR";
    }
    return [parseFloat(numbers[0]), parseFloat(numbers[1]), operator];
}

function evaluateEquation(equation) {
    const [num1, num2, operator] = breakDownEquation(equation);
    return operate(num1, num2, operator)
}
