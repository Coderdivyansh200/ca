
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) {
      if (operator && previousInput && !currentInput) {
        currentInput = value;
      } else {
        currentInput += value;
      }
      updateDisplay(currentInput);
    }

    if (button.classList.contains('operator')) {
      if (currentInput) {
        if (previousInput) {
          previousInput = calculate(previousInput, currentInput, operator);
          updateDisplay(previousInput);
        } else {
          previousInput = currentInput;
        }
        currentInput = '';
      }
      operator = value;
    }

    if (action === 'clear') {
      currentInput = '';
      previousInput = '';
      operator = '';
      updateDisplay('0');
    }

    if (action === 'calculate') {
      if (currentInput && previousInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        updateDisplay(result);
        previousInput = result;
        currentInput = '';
        operator = '';
      }
    }
  });
});

function updateDisplay(value) {
  display.textContent = value;
}

function calculate(num1, num2, op) {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  if (op === '+') return n1 + n2;
  if (op === '-') return n1 - n2;
  if (op === '*') return n1 * n2;
  if (op === '/') return n2 !== 0 ? n1 / n2 : 'Error';
}
