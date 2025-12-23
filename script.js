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
    let equationCopy = equation;
    let isNegative = false;
    if (equation.at(0) === "-") {
        equationCopy = equationCopy.replace("-", "");
        isNegative = true;
    }
    const operatorList = ["+", "-", "*", "/"];
    let validEquation = false;
    for (operator of operatorList) {
        if(equationCopy.includes(operator) 
            && (equationCopy.indexOf(operator) === equationCopy.lastIndexOf(operator))) {
            validEquation = true;
            break;
        }
    }
    if (validEquation) {
        return [operator, isNegative];
    }
    return ["ERROR", isNegative];
}

function breakDownEquation(equation) {
    const [operator, isNegative] = getOperator(equation);
    let equationCopy = equation;
    if (equation.at(0) === "-") {
        equationCopy = equationCopy.replace("-", "");
    }
    if (operator === "ERROR") {
        return "ERROR";
    }
    let numbers = equationCopy.split(operator);
    if (   isNaN(parseFloat(numbers[0]))
        || isNaN(parseFloat(numbers[1]))) {
        return "ERROR";
    }
    if (isNegative === true) {
       numbers[0] = "-" + numbers[0]; 
    }
    return [parseFloat(numbers[0]), parseFloat(numbers[1]), operator];

}

function evaluateEquation(equation) {
    const [num1, num2, operator] = breakDownEquation(equation);
    let solution = operate(num1, num2, operator);
    if (solution.toString().includes(".")) {
        return Math.round(solution * 10000) / 10000;
    }
    return solution;
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

function clearIfError() {
    if (display.textContent === "ERROR") {
        clearDisplay();
    }
}

back.addEventListener("click", backspace);
function backspace() {
    clearIfError();
    display.textContent = display.textContent.slice(0, -1);
}

for (const digit of digits) {
    digit.addEventListener("click", outputDigit);
}
function outputDigit(event) {
    clearIfError();
    display.textContent += this.textContent;
}

for (const operator of operators) {
    operator.addEventListener("click", useOperator);
}
function useOperator(event) {
    equationCopy = getEquationCopy();
    if (operators.some(operator => equationCopy.includes(operator.textContent))) {
        solveEquation();
        equationCopy = getEquationCopy();
        if (!operators.some(operator => equationCopy.includes(operator.textContent))) {
            display.textContent += this.textContent;
        }
    }
    else if (!isNaN(parseFloat(display.textContent))) {
        display.textContent += this.textContent;
    }
}

function getEquationCopy() {
    let equationCopy = display.textContent;
    if (equationCopy.at(0) === "-") {
        equationCopy = equationCopy.replace("-", "");
    }
    return equationCopy;
}

equals.addEventListener("click", solveEquation);
function solveEquation() {
    const solution = evaluateEquation(display.textContent);
    if (solution === "DIVIDE BY 0 ERROR") {
        display.textContent = "Nope!";
    }
    else if (solution !== "ERROR" && !isNaN(solution)) {
        display.textContent = solution;
    }

}

/// TODO: 
///       make the copy of the equation into a function instead of retyping 3
///       decimal support
///       make display wrap and expand down
///       display big numbers in ... *e^ ... 
///       proper frontend
///       keyboard support