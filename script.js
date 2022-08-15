let buttons = document.querySelector('#button-container');
let display = document.querySelector('#display');

let displayContent = '0';
let firstOperand = null;
let operator = null;
let secondOperand = null;
let sum = null;
let operatorSelected = false;
let sumCalculated = false;
let inputKey;

document.addEventListener('keydown', (e) => {
    console.log(e);
});

buttons.addEventListener('click', parseInput);
document.addEventListener('keydown', parseKeyboardInput);
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
    inputKey = e.target.id;

    if (e.target.classList.contains('number')) {
        numberInput(inputKey);
    }

    else if (e.target.classList.contains('operator')) {
        operatorInput(inputKey);
    }

    else if (e.target.id == 'equal') {
        equalsInput();
    }

    else if (e.target.id == 'cancel') {
        resetCalculation();
    }

    else if (e.target.id == 'backspace') {
        removeCharacter();
    }

    else if (e.target.id == 'negative') {
        toggleNegative();
    }
}

function parseKeyboardInput(e) {
    inputKey = e.key;

    if ((e.key >= 0 && e.key < 10) || e.key == '.') {
        numberInput(inputKey);
    }

    else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
        operatorInput(inputKey);
    }

    else if (e.key == '=') {
        equalsInput();
    }

    else if (e.key == 'Escape') {
        resetCalculation();
    }

    else if (e.key == 'Backspace') {
        removeCharacter();
    }

    else if (e.key == '#') {
        toggleNegative();
    }
}

function numberInput(inputKey) {
    //Only allow one decimal to be entered
    if (displayContent.toString().includes('.') && inputKey == '.') {
        return;
    }

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

    displayContent += inputKey;
    display.textContent = displayContent;
}

function operatorInput(inputKey) {
    //Check whether number is entered into display
    if (!(displayContent == '')) {
        //If this is first number entered
        if (firstOperand == null) {
            firstOperand = displayContent;
            operator = inputKey;
        }

        //If sum is already calculated
        else if (!(sum == null)) {
            firstOperand = sum;
            operator = inputKey;
            sum = null;
            secondOperand = null;
        }

        //If first number is already entered, but sum is not calculated yet,
        //then calculate previous sum and assign to firstOperand for use in next sum
        else {
            secondOperand = displayContent;
            firstOperand = operate(firstOperand, operator, secondOperand);
            display.textContent = firstOperand;
            operator = inputKey;
            secondOperand = null;
        }

        operatorSelected = true;
        displayContent = '';
    }        
}

function equalsInput() {
    //Check there are two operands before calculating sum
    if (!(firstOperand == null) && !(displayContent == null)) {
        secondOperand = displayContent;
        sum = roundSum(operate(firstOperand, operator, secondOperand));

        firstOperand = null;
        secondOperand = null;

        displayContent = sum;
        display.textContent = displayContent;

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

function removeCharacter() {
    displayContent = displayContent.slice(0,-1);
    display.textContent = displayContent;
}

function toggleNegative() {
    if (displayContent.toString().includes('-')) {
        displayContent = displayContent.replace('-','');
    }
    else {
        displayContent = '-' + displayContent;
    }
    display.textContent = displayContent;
}