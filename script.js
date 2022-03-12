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
    if (b == 0 || b == null) {
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
        display = 0 + button.target.textContent;

      }
      else {
        display = button.target.textContent;
      }
    }
    else if (button.target.id == 'decimal') {
      if (!display.includes('.')) {
        display += button.target.textContent;
      }
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
        updateDisplay(display, true);
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
        updateDisplay(display, true);
        firstInput = display;
        secondInput = null;
      }
      operator = button.target.textContent;
      updateHistory(operator, firstInput);
      display = null;
    }
  }
}

function updateDisplay(display, round = false) {
  const output = document.querySelector('.output');
  if (display.toString().length > 12) {
    display = Number.parseFloat(display).toExponential(5);
    output.textContent = display;
  }
  else {
    if (round) {
      output.textContent = Math.round(display * 10000) / 10000; // Four decimal places
    }
    else {
      output.textContent = display;
    }
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

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
  if (display != null) {
    display = display.slice(0, -1);
    if (secondInput == null) {
      firstInput = display;
    }
    else {
      secondInput = display;
    }
    if (display == '') {
      display = null;
      updateDisplay(0);
    }
    else {
      updateDisplay(display);
    }
  }
});

document.onkeydown = (e) => {
  switch(e.key) {
    case '1':
      document.getElementById('one').click();
      break;
    case '2':
      document.getElementById('two').click();
      break;
    case '3':
      document.getElementById('three').click();
      break;
    case '4':
      document.getElementById('four').click();
      break;
    case '5':
      document.getElementById('five').click();
      break;
    case '6':
      document.getElementById('six').click();
      break;
    case '7':
      document.getElementById('seven').click();
      break;
    case '8':
      document.getElementById('eight').click();
      break;
    case '9':
      document.getElementById('nine').click();
      break;
    case '0':
      document.getElementById('zero').click();
      break;
    case '+':
      document.getElementById('add').click();
      break;
    case '-':
      document.getElementById('subtract').click();
      break;
    case '*':
      document.getElementById('multiply').click();
      break;
    case '/':
      e.preventDefault();
      document.getElementById('divide').click();
      break;
    case '.':
      document.getElementById('decimal').click();
      break;
    case 'Delete':
      document.querySelector('.clear').click();
      break;
    case 'Backspace':
      document.querySelector('.delete').click();
      break;
    case 'Enter':
      document.getElementById('equals').click();
      break;
  }
}
