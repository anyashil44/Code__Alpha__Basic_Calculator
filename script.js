 const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
let history = [];

function appendNumber(num) {
  display.value += num;
}

function appendOperator(op) {
  const lastChar = display.value.slice(-1);
  if ('+-*/%'.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + op;
  } else {
    display.value += op;
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');
    const result = eval(expression);
    if (display.value.trim() !== '') {
      addToHistory(`${display.value} = ${result}`);
    }
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}

function addToHistory(entry) {
  history.unshift(entry);
  if (history.length > 10) history.pop(); // Keep only 10 entries
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.onclick = () => {
      const expr = item.split('=')[0].trim();
      display.value = expr;
    };
    historyList.appendChild(li);
  });
}

// ✅ Keyboard Support
document.addEventListener('keydown', function (e) {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(e.key)) {
    appendNumber(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
