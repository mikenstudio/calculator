// Create document references

const display = document.querySelector(".display");
const buttonGroup = document.querySelectorAll(".button");
const numButtons = buttonGroup.length;
let currentVal;
let firstVal;
let secondVal;
let runningTotal;
let nextOperand;
let decimal = false;
let negative = false;
let calculated = false;

// console.log(buttonGroup);
// console.log(buttonGroup.length);
// console.log(buttonGroup[1].textContent);

document.addEventListener("keyup", (e) => {
  if (isNum(e.key)) {
    processNum(e.key);
  } else if (isOperand(e.key)) {
    processOperand(e.key);
  } else if (e.key == "Enter") {
    processOperand("=");
  }
});

for (let i = 0; i < numButtons; i++) {
  const currentButton = buttonGroup[i];
  const buttonValue = currentButton.textContent;
  currentButton.addEventListener("click", (e) => {
    processInput(`${buttonValue}`);
    // console.log(e);
  });
}

function processInput(btn) {
  if (isOperand(btn)) {
    processOperand(btn);
  } else if (isNum(btn)) {
    processNum(btn);
  }
}

function isOperand(val) {
  operands = "+/-xC=";
  if (operands.includes(val) || val == "(-)") {
    return true;
  }
}

function isNum(val) {
  nums = "1234567890.";
  if (nums.includes(val)) {
    return true;
  }
}

function processOperand(op) {
  // Gather and parse existing value

  if (op == "(-)") {
    convertNegative();
    return;
  }

  if (runningTotal) {
    firstVal = runningTotal;
  } else {
    firstVal = currentVal;
  }

  currentVal = display.textContent;
  checkDecimal();
  resetDisplay();

  switch (op) {
    case "=":
      if (nextOperand) {
        if (!secondVal) {
          secondVal = currentVal;
        }

        calculate(nextOperand);
        calculated = true;
        break;
      }

    case "+":
      nextOperand = "add";
      break;
    case "-":
      nextOperand = "subtract";
      break;
    case "x":
      nextOperand = "multiply";
      break;
    case "/":
      nextOperand = "divide";
      break;
    case "C":
      clearAll();
      break;
  }
}

function processNum(num) {
  if (calculated) {
    clearAll();
  }
  tempVal = display.textContent;
  while (tempVal.length > 0 && tempVal[0] === "0") {
    tempVal = tempVal.slice(1);
  }
  display.textContent = tempVal + num;
  // tempVal = tempVal + num;
  // if (decimal) {
  //   display.textContent = parseFloat(tempVal);
  // } else {
  //   display.textContent = parseInt(tempVal);
  // }
}

function convertNegative() {
  currentVal = display.textContent;
  checkDecimal();
  currentVal = currentVal * -1;
  display.textContent = `${currentVal}`;
}

function checkDecimal() {
  if (currentVal.includes(".")) {
    // Decimal true not needed(?)
    decimal = true;
    currentVal = parseFloat(currentVal);
  } else {
    currentVal = parseInt(currentVal);
  }
}

function resetDisplay() {
  display.textContent = "0";
  decimal = false;
  negative = false;
}

function clearAll() {
  resetDisplay();
  currentVal = null;
  firstVal = null;
  secondVal = null;
  runningTotal = null;
  calculated = false;
}

function calculate(op) {
  switch (op) {
    case "add":
      add();
      displayResults();
      break;
    case "subtract":
      subtract();
      displayResults();
      break;
    case "multiply":
      multiply();
      displayResults();
      break;
    case "divide":
      divide();
      displayResults();
      break;
  }
}

function displayResults() {
  display.textContent = runningTotal;
}

function add() {
  runningTotal = firstVal + secondVal;
}

function subtract() {
  runningTotal = firstVal - secondVal;
}
function multiply() {
  runningTotal = firstVal * secondVal;
}

function divide() {
  if (secondVal === 0) {
    runningTotal = "Error: Div 0";
    return;
  }
  runningTotal = firstVal / secondVal;
}
