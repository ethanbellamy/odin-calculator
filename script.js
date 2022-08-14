function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate(num1,operator,num2) {
    if (operator == '+') {
        return add(+num1,+num2);
    }

    else if (operator == '-') {
        return subtract(+num1,+num2);
    }

    else if (operator == '*') {
        return multiply(+num1,+num2);
    }

    else if (operator == '/') {
        return divide(+num1,+num2);
    }
}

let buttons = document.querySelector('#button-container');
let display = document.querySelector('#display');

let displayContent = '';
let firstOperand = null;
let operator = null;
let secondOperand = null;
let sum = null;
let operatorSelected = false;
let sumCalculated = false;

buttons.addEventListener('click', parseInput);

function parseInput(e) {
    //Number selected
    if (e.target.classList.contains('number') && displayContent.length < 8) {
        //Clear display after operator selected
        if (operatorSelected == true) {
            display.textContent = displayContent;
            operatorSelected = false;
        }

        //Start new calculation after equals selected
        if (sumCalculated == true) {
            resetCalculation();
        }
        
        displayContent += e.target.id;
        display.textContent = displayContent;
    }

    //Operator selected
    else if (e.target.classList.contains('operator')) {
        //Check whether number is entered into display
        if (!(displayContent == '')) {
            //If this is first number entered
            if (firstOperand == null) {
                firstOperand = displayContent;
                operator = e.target.id;
            }

            //If sum is already calculated
            else if (!(sum == null)) {
                firstOperand = sum;
                operator = e.target.id;
                sum = null;
                secondOperand = null;
            }

            //If first number is already entered, but sum is not calculated yet,
            //then calculate previous sum and assign to firstOperand for use in next sum
            else {
                secondOperand = displayContent;
                firstOperand = operate(firstOperand, operator, secondOperand);
                display.textContent = firstOperand;
                operator = e.target.id;
                secondOperand = null;
            }

            operatorSelected = true;
            displayContent = '';
        }
    }

    //Equals selected
    else if (e.target.id == 'equal') {
        //Check there are two operands before calculating sum
        if (!(firstOperand == null) && !(displayContent == null)) {
            secondOperand = displayContent;
            sum = operate(firstOperand, operator, secondOperand);

            firstOperand = null;
            secondOperand = null;

            displayContent = sum;
            display.textContent = displayContent;

            displayContent = '';
            sumCalculated = true;
        }
    }

    //Cancel selected
    else if (e.target.id == 'cancel') {
        resetCalculation();
    }
}

function resetCalculation() {
    displayContent = '';
    display.textContent = displayContent;

    firstOperand = null;
    operator = null;
    secondOperand = null;
    sum = null;
    operatorSelected = false;
    sumCalculated = false;
}