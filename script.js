let currentBalance = 0;

document.getElementById("bankForm").addEventListener("submit", handleFormSubmit);
document.getElementById("depositBtn").addEventListener("click", handleDeposit);
document.getElementById("withdrawBtn").addEventListener("click", handleWithdraw);

function handleFormSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const accNoInput = document.getElementById("accNo");

  const name = nameInput.value.trim();
  const accNo = accNoInput.value.trim();

  if (!name || !accNo) {
    alert("Please fill all details.");
    return;
  }

  const initial = getAmountFromPrompt("Enter Initial Balance:");
  if (initial === null) return;

  currentBalance = initial;

  nameInput.disabled = true;
  accNoInput.disabled = true;

  showActionButtons();
  updateDisplay(name, accNo, currentBalance);
}

function handleDeposit() {
  const amount = getAmountFromPrompt("Enter amount to deposit:");
  if (amount === null) return;

  currentBalance += amount;
  refreshDisplay();
}

function handleWithdraw() {
  const amount = getAmountFromPrompt("Enter amount to withdraw:");
  if (amount === null) return;

  if (amount > currentBalance) {
    alert("Insufficient balance!");
    return;
  }

  currentBalance -= amount;
  refreshDisplay();
}

function getAmountFromPrompt(message) {
  let input = prompt(message);
  if (input === null) return null;

  let amount = parseFloat(input);
  if (isNaN(amount) || amount < 0) {
    alert("Invalid amount.");
    return null;
  }

  return amount;
}

function showActionButtons() {
  document.getElementById("actions").classList.remove("hidden");
}

function updateDisplay(name, accNo, balance) {
  document.getElementById("displayName").textContent = name;
  document.getElementById("displayAccNo").textContent = accNo;
  document.getElementById("displayBalance").textContent = balance.toFixed(2);
}

function refreshDisplay() {
  const name = document.getElementById("name").value.trim();
  const accNo = document.getElementById("accNo").value.trim();
  updateDisplay(name, accNo, currentBalance);
}
