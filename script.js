function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return Math.round(a / b * 100) / 100;
}

let firstNum;
let operator;
let secondNum;

function operate(operator, firstNum, secondNum) {
    if (operator === "+") {
        return add(firstNum, secondNum);
    }
    else if (operator === "-") {
        return subtract(firstNum, secondNum);
    }
    else if (operator === "*") {
        return multiply(firstNum, secondNum);
    }
    else {
        return divide(firstNum, secondNum);
    }
}

// Display para
let displayPara = document.querySelector("#display-para");

// Add functions for numbers buttons
// If currentInput 0 or Operator buttons just clicked
// Change currentInput = new number
// Else add newInput to currentInput
let numberButtons = document.querySelectorAll(".number-btn");
numberButtons.forEach(element => {
    element.addEventListener("click", () => {
        if (displayPara.textContent == 0 || checkClickedClassExist()) {
            removeOperatorButtonClicked();
            displayPara.textContent = element.textContent;
        }
        else {
            displayPara.textContent += element.textContent;
        }
    })
})

// Add functions for operator buttons
let operatorButtons = document.querySelectorAll(".operator-btn");
operatorButtons.forEach(element => {
    element.addEventListener("click", () => {
        // Change isDotClicked = false. Because when user clicked a operator button
        // They will add a new number. This number can be a float number
        isDotClicked = false;

        // At the first time user click a operator button
        // Add the input number to firstnum variable to calculate later 
        if (!firstNum) {
            firstNum = +displayPara.textContent;
        }
        // At the second time. User click a operator button
        // Right now first number is exist. So store current input number to second number variable
        // Calculate and display result
        // Add result to first num if user continue to calculate
        else if (!secondNum) {
            secondNum = +displayPara.textContent;

            displayPara.textContent = operate(operator, firstNum, secondNum);
            firstNum = operate(operator, firstNum, secondNum);
            secondNum = null;
        }

        element.classList.add("clicked");
        operator = element.textContent;
    })
})

// Add functsion for equal buttons
// If secondNum variable is null. Add current input to second number
// Then calculate
// Display result and reset input
let equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", () => {
    if (!secondNum) {
        secondNum = +displayPara.textContent;
    }

    displayPara.textContent = operate(operator, firstNum, secondNum);

    resetInput();
});

// Add function for clear button
let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    displayPara.textContent = 0;
    resetInput();
})

function resetInput() {
    firstNum = null;
    secondNum = null;
    operator = null;
    removeOperatorButtonClicked();
}

function checkClickedClassExist() {
    let result = false;

    operatorButtons.forEach(element => {
        if (element.classList.contains("clicked")) {
            result = true;
        }
    })

    return result;
}

function removeOperatorButtonClicked() {
    operatorButtons.forEach(element => {
        element.classList.remove("clicked");
    })
}

// Add function to dot button
let isDotClicked = false;
let dotButton = document.querySelector("#dot");
dotButton.addEventListener("click", () => {
    if (!isDotClicked) {
        isDotClicked = true;
        displayPara.textContent += ".";
    }
})
