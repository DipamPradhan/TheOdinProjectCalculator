const buttons = document.querySelector(".buttons");
const display = document.getElementById("inputField");

let firstNumber = "";
let operator = null;
let shouldResetDisplay = false;
let activeOperatorButton = null;

function inputNumber(num) {
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }
    if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active");
    activeOperatorButton = null;
  }
    
  
  if (num === "." && display.value.includes(".")) return;
  display.value += num;
}


function inputOperator(opName,button) {
  if (display.value === "" && opName === "substract") {
    display.value = "-";
    shouldResetDisplay = false;
    return;
  }

  if (display.value === "") return;
  if (operator !== null) calculateResult();

  firstNumber = display.value;

  switch (opName) {
    case "add": operator = "+"; break;
    case "substract": operator = "-"; break;
    case "multiply": operator = "*"; break;
    case "divide": operator = "/"; break;
    case "mod": operator = "%"; break;
  }

    if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active");
  }

  button.classList.add("active");
  activeOperatorButton = button;
  shouldResetDisplay = true;
}

function operate(a, op, b) {
  a = Number(a);
  b = Number(b);

  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Error" : (a / b).toFixed(2);
    case "%": return b === 0 ? "Error" : a % b;
    default: return "Error";
  }
}

function calculateResult() {
  if (operator === null || shouldResetDisplay) return;

  const secondNumber = display.value;
  const result = operate(firstNumber, operator, secondNumber);

  display.value = result;
  firstNumber = result;
  operator = null;
  shouldResetDisplay = true;
}


function handleAction(action) {
  switch (action) {
    case "clear":
      display.value = "";
      firstNumber = "";
      operator = null;
              if (activeOperatorButton) {
        activeOperatorButton.classList.remove("active");
        activeOperatorButton = null;
      }
      break;

    case "delete":
      display.value = display.value.slice(0, -1);
              if (activeOperatorButton) {
        activeOperatorButton.classList.remove("active");
        activeOperatorButton = null;
      }
      break;

    case "equals":
      calculateResult();
        if (activeOperatorButton) {
        activeOperatorButton.classList.remove("active");
        activeOperatorButton = null;
      }
      break;
  }
}

buttons.addEventListener("click", (e) => {
  const btn = e.target;
  if (!btn.matches("button")) return;

  const value = btn.dataset.value;
  const action = btn.dataset.action;
  const opName = btn.dataset.operator;

  if (value) {
    inputNumber(value);
  } else if (opName) {
    inputOperator(opName,btn);
  } else if (action) {
    handleAction(action);
  }
});
