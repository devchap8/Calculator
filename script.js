// Equation Handling

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
    const operatorList = ["+", "-", "*", "/"];
    let validEquation = false;
    for (operator of operatorList) {
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

// Calculator Functionality

const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const back = document.querySelector(".back");
const equals = document.querySelector(".equals");
const digits = Array.from(document.querySelectorAll(".digit"));
const operators = Array.from(document.querySelectorAll(".operator"));

clear.addEventListener("click", clearDisplay);
function clearDisplay() {
    display.textContent = "";
}

back.addEventListener("click", backspace);
function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

for (const digit of digits) {
    digit.addEventListener("click", outputDigit);
}
function outputDigit(event) {
    display.textContent += this.textContent;
}

for (const operator of operators) {
    operator.addEventListener("click", useOperator);
}
function useOperator(event) {
    if (operators.some(operator => display.textContent.includes(operator.textContent))) {
        // Do the function for equals where you evaluate the expression in 
        //   the display, then display the result and add the operator the 
        //   user clicked
    }
    else if (!isNaN(parseFloat(display.textContent))) {
        display.textContent += this.textContent;
    }
}

