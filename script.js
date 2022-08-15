let buttons = document.querySelector('#button-container');
let display = document.querySelector('#display');

let displayContent = '0';
let firstOperand = null;
let operator = null;
let secondOperand = null;
let sum = null;
let operatorSelected = false;
let sumCalculated = false;

buttons.addEventListener('click', parseInput);
display.textContent = displayContent;

function operate(num1,operator,num2) {
    if (operator == '+') {
        return +num1 + +num2;
    }

    else if (operator == '-') {
        return +num1 - +num2;
    }

    else if (operator == '*') {
        return +num1 * +num2;
    }

    else if (operator == '/') {
        return +num1 / +num2;
    }
}

function parseInput(e) {
    if (e.target.classList.contains('number')) {
        numberInput(e);
    }

    else if (e.target.classList.contains('operator')) {
        operatorInput(e);
    }

    //Equals selected
    else if (e.target.id == 'equal') {
        equalsInput(e);
    }

    //Cancel selected
    else if (e.target.id == 'cancel') {
        resetCalculation();
    }
}

function numberInput(e) {
    //Clear display after operator selected
    if (operatorSelected == true) {
        display.textContent = displayContent;
        operatorSelected = false;
    }

    //Start new calculation after equals selected
    if (sumCalculated == true) {
        resetCalculation();
    }
    
    //If first number entered
    if (displayContent == '0') {
        displayContent = '';
    }

    displayContent += e.target.id;
    display.textContent = displayContent;
}

function operatorInput(e) {
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

function equalsInput(e) {
    //Check there are two operands before calculating sum
    if (!(firstOperand == null) && !(displayContent == null)) {
        secondOperand = displayContent;
        sum = roundSum(operate(firstOperand, operator, secondOperand));

        firstOperand = null;
        secondOperand = null;

        displayContent = sum;
        display.textContent = displayContent;

        displayContent = '';
        sumCalculated = true;
    }
}

function resetCalculation() {
    displayContent = 0;
    display.textContent = displayContent;

    firstOperand = null;
    operator = null;
    secondOperand = null;
    sum = null;
    operatorSelected = false;
    sumCalculated = false;
}

function roundSum(sum) {
    if (sum.toString().includes('.')) {
        return +(Math.round(sum + "e+3")  + "e-3");
    }
    else {
        return sum;
    }
}