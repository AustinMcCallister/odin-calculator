let display = null;
let history = '';
let firstInput = null;
let secondInput = null;
let operator = null;

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
  return a / b;
}

function operate(operator, a, b = 0) {
  if (operator === '+') {
    return add(+a, +b);
  }
  else if (operator === '−') {
    return subtract(a, b);
  }
  else if (operator === '×') {
    return multiply(a, b);
  }
  else if (operator === '÷') {
    if (b == 0) {
      return NaN;
    }
    else {
      return divide(a, b);
    }
  }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', operateButton);
});

function operateButton(button) {
  if (button.target.classList.contains('number')) {
    if (display == null || display == NaN) { // 'Blank' display
      if (button.target.id == 'decimal') {

      }
      else {
        display = button.target.textContent;
      }
    }
    else if (button.target.id == 'decimal') {

    }
    else if (display.length < 12) {
      display += button.target.textContent;
    }
    if (operator == null) {
      firstInput = display;
    }
    else {
      secondInput = display;
    }
    updateDisplay(display);
  }
  else if (button.target.classList.contains('operator')) {
    if (button.target.id == 'equals') {
      if (firstInput != null && operator != null) {
        display = operate(operator, firstInput, secondInput);
        updateDisplay(display);
        firstInput = display;
        secondInput = null;
        operator = null;
        display = null;
        history = '';
        updateHistory();
      }
    }
    else {
      if (firstInput == null) {
        firstInput = 0;
      }
      else if (secondInput != null) {
        secondInput = display;
        display = operate(operator, firstInput, secondInput);
        updateDisplay(display);
        firstInput = display;
        secondInput = null;
      }
      operator = button.target.textContent;
      updateHistory(operator, firstInput);
      display = null;
    }
  }
}

function updateDisplay(display) {
  const output = document.querySelector('.output');
  if (display.toString().length > 12) {
    display = Number.parseFloat(display).toExponential(5);
    output.textContent = display;
  }
  else {
    output.textContent = Math.round(display * 100) / 100;
  }
}

function updateHistory(operator = '', firstInput = '', secondInput = '') {
  const outputHistory = document.querySelector('.calculation');
  outputHistory.textContent = `${firstInput} ${operator} ${secondInput}`;
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
  display = null;
  history = '';
  firstInput = null;
  secondInput = null;
  operator = null;
  updateDisplay(0);
  updateHistory();
});
