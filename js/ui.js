// ================================
// Dashboard
// ================================

const renderDashboard = wallet => {

  document.querySelector("#balance").textContent =
    formatCurrency(wallet.balance);

  document.querySelector("#credit").textContent =
    formatCurrency(wallet.totalCredit);

  document.querySelector("#debit").textContent =
    formatCurrency(wallet.totalDebit);

  document.querySelector("#transactionCount").textContent =
    wallet.transactions.length;

};

// ================================
// Generic Dropdown Renderer
// ================================

const renderOptions = (selectId, options, placeholder = "") => {

  const select = document.querySelector(selectId);

  select.innerHTML = "";

  if (placeholder) {

    const option = document.createElement("option");

    option.value = "";

    option.textContent = placeholder;

    select.append(option);

  }

  options.forEach(item => {

    const option = document.createElement("option");

    option.value = item.toLowerCase();

    option.textContent = item;

    select.append(option);

  });

};

// ================================
// Purpose
// ================================

const renderPurposeOptions = () => {

  renderOptions(
    "#purpose",
    PURPOSES,
    "Select Purpose"
  );

};

// ================================
// Filter
// ================================

const renderFilterOptions = () => {

  renderOptions(
    "#filter",
    FILTER_OPTIONS
  );

};

// ================================
// Sort
// ================================

const renderSortOptions = () => {

  renderOptions(
    "#sort",
    SORT_OPTIONS
  );

};

// ================================
// Transactions
// ================================

const renderTransactions = transactions => {

  const tbody =
    document.querySelector("#transactionBody");

  tbody.innerHTML = "";

  if (transactions.length === 0) {

    tbody.innerHTML = `

            <tr>

                <td colspan="7">

                    No Transactions Found

                </td>

            </tr>

        `;

    return;

  }

  const rows = transactions.map(transaction => `

        <tr>

            <td>${transaction.date}</td>

            <td>${transaction.receiver}</td>

            <td>${transaction.purpose}</td>

            <td>${transaction.type}</td>

            <td>${formatCurrency(transaction.amount)}</td>

            <td>

                <span class="status success">

                    Success

                </span>

            </td>

            <td>

                <button
                    class="delete-btn"
                    data-id="${transaction.id}">

                    Delete

                </button>

            </td>

        </tr>

    `).join("");

  tbody.innerHTML = rows;

};

// ================================
// Toast
// ================================

const showToast = message => {

  alert(message);

};