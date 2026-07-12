// =============================
// Global State
// =============================

let wallet = loadData();

// =============================
// Initialize
// =============================

const init = () => {

  renderPurposeOptions();

  renderFilterOptions();

  renderSortOptions();

  refreshUI();

  bindEvents();

};

document.addEventListener("DOMContentLoaded", init);

// =============================
// Refresh UI
// =============================

const refreshUI = () => {

  renderDashboard(wallet);

  let transactions = [...wallet.transactions];

  transactions = searchTransactions(transactions);

  transactions = filterTransactions(transactions);

  transactions = sortTransactions(transactions);

  renderTransactions(transactions);

};

// =============================
// Event Binding
// =============================

const bindEvents = () => {

  document
    .querySelector("#addMoneyForm")
    .addEventListener("submit", addMoney);

  document
    .querySelector("#sendMoneyForm")
    .addEventListener("submit", sendMoney);

  document
    .querySelector("#search")
    .addEventListener("input", refreshUI);

  document
    .querySelector("#filter")
    .addEventListener("change", refreshUI);

  document
    .querySelector("#sort")
    .addEventListener("change", refreshUI);

  document
    .querySelector("#transactionBody")
    .addEventListener("click", deleteTransaction);

};

// =============================
// Add Money
// =============================

const addMoney = e => {

  e.preventDefault();

  const amount =
    Number(document.querySelector("#addAmount").value);

  const error = validateAmount(amount);

  if (error) {

    showToast(error);

    return;

  }

  wallet.balance += amount;

  wallet.totalCredit += amount;

  wallet.transactions.unshift({

    id: generateId(),

    receiver: "Self",

    purpose: "Wallet",

    type: "Credit",

    amount,

    date: getCurrentDate()

  });

  saveData(wallet);

  refreshUI();

  e.target.reset();

};

// =============================
// Send Money
// =============================

const sendMoney = e => {

  e.preventDefault();

  const receiver =
    document.querySelector("#receiver").value.trim();

  const amount =
    Number(document.querySelector("#sendAmount").value);

  const purpose =
    document.querySelector("#purpose").value;

  let error = validateReceiver(receiver);

  if (error) {

    showToast(error);

    return;

  }

  error = validateAmount(amount);

  if (error) {

    showToast(error);

    return;

  }

  if (!purpose) {

    showToast("Select Purpose");

    return;

  }

  error = validateBalance(wallet.balance, amount);

  if (error) {

    showToast(error);

    return;

  }

  wallet.balance -= amount;

  wallet.totalDebit += amount;

  wallet.transactions.unshift({

    id: generateId(),

    receiver,

    purpose,

    type: "Debit",

    amount,

    date: getCurrentDate()

  });

  saveData(wallet);

  refreshUI();

  e.target.reset();

};

// =============================
// Delete Transaction
// =============================

const deleteTransaction = e => {

  if (!e.target.classList.contains("delete-btn")) return;

  const id = e.target.dataset.id;

  const transaction =
    wallet.transactions.find(item => item.id === id);

  if (!transaction) return;

  if (transaction.type === "Credit") {

    wallet.balance -= transaction.amount;

    wallet.totalCredit -= transaction.amount;

  } else {

    wallet.balance += transaction.amount;

    wallet.totalDebit -= transaction.amount;

  }

  wallet.transactions =
    wallet.transactions.filter(item => item.id !== id);

  saveData(wallet);

  refreshUI();

};

// =============================
// Search
// =============================

const searchTransactions = transactions => {

  const keyword =
    document.querySelector("#search")
      .value
      .toLowerCase();

  if (!keyword) return transactions;

  return transactions.filter(transaction =>
    transaction.receiver
      .toLowerCase()
      .includes(keyword)
  );

};

// =============================
// Filter
// =============================

const filterTransactions = transactions => {

  const filter =
    document.querySelector("#filter").value;

  if (filter === "all") return transactions;

  return transactions.filter(transaction =>
    transaction.type.toLowerCase() === filter
  );

};

// =============================
// Sort
// =============================

const sortTransactions = transactions => {

  const sort =
    document.querySelector("#sort").value;

  switch (sort) {

    case "oldest":

      return [...transactions].reverse();

    case "highest amount":

      return [...transactions]
        .sort((a, b) => b.amount - a.amount);

    case "lowest amount":

      return [...transactions]
        .sort((a, b) => a.amount - b.amount);

    default:

      return transactions;

  }

};