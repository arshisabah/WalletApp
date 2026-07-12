// ui.js
// Think of ui.js as
// The Painter
// It only paints the screen.
// It NEVER
// ❌ validates
// ❌ saves localStorage
// ❌ updates balance
// It only SHOWS DATA.

// ==========================
// Dashboard
// ==========================

const renderDashboard = wallet => {

  document.querySelector('#balance').textContent = formatCurrency(wallet.balance);
  document.querySelector("#credit").textContent = formatCurrency(wallet.totalCredit);
  document.querySelector("#debit").textContent = formatCurrency(wallet.totalDebit);
  document.querySelector("#transactionCount").textContent = wallet.transactions.length;
}

// ==========================
// Purpose Dropdown
// ==========================

const renderPurposeOptions = () => {

  const purpose = document.querySelector("#purpose");
  purpose.innerHTML = `<option value="">Select Purpose</option>`;

  PURPOSES.forEach(item => {

    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    purpose.append(option);
  });
}

// ==========================
// Filter Dropdown
// ==========================

const renderFilterOptions = () => {

  const filter = document.querySelector("#filter");
  filter.innerHTML = "";

  FILTERS_OPTIONS.forEach(item => {

    const option = document.createElement("option");
    option.value = item.toLowerCase();
    option.textContent = item;
    filter.append(option);
  });
}

// ==========================
// Transactions
// ==========================

const renderTransactions = (transactions) => {

  const tbody = document.querySelector("#transactionBody");
  tbody.innerHTML = "";

  if (transactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center">No transactions found.</td>
      </tr>
    `;  

    return;
  }

  transactions.forEach((transaction) => {
    // Render each transaction
    tbody.innerHTML +=`

        <tr>

            <td>${transaction.date}</td>
            <td>${transaction.receiver}</td>
            <td>${transaction.purpose}</td>
            <td>${transaction.type}</td>
            <td>${formatCurrency(transaction.amount)}</td>
            <td>Success</td>
            <td>
                <button
                class="delete-btn"
                data-id="${transaction.id}">
                Delete
                </button>
            </td>
        </tr>
        `;
  });
}

// ==========================
// Toast
// ==========================
const showToast = (message) => {
  alert(message);
};
