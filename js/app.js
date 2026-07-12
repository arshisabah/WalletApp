const init = () => {

  renderPurposeOptions();
  renderFilterOptions();
  const wallet = loadData();
  renderDashboard(wallet);
  renderTransactions(wallet.transactions);

};

document.addEventListener("DOMContentLoaded", init);

// ==========================
// Add Money
// ==========================

document.querySelector("#addMoneyForm").addEventListener("submit",
  e => {
    e.preventDefault();
    const amount =
      document
        .querySelector("#addAmount")
        .value;
    const error =
      validateAmount(amount);
    if (error) {
      showToast(error);
      return;
    }

    const wallet =
      loadData();
    wallet.balance += Number(amount);
    wallet.totalCredit += Number(amount);
    wallet.transactions.unshift({
      id: generateId(),
      receiver: "Self",
      purpose: "Wallet",
      type: "Credit",
      amount: Number(amount),
      date: getCurrentDate()
    });

    saveData(wallet);
    renderDashboard(wallet);
    renderTransactions(wallet.transactions);
    e.target.reset();
  }
);

// ==========================
// Send Money
// ==========================

document
  .querySelector("#sendMoneyForm")
  .addEventListener(
    "submit",
    e => {
      e.preventDefault();
      const receiver =
        document
          .querySelector("#receiver")
          .value;
      const amount =
        document
          .querySelector("#sendAmount")
          .value;

      const purpose =
        document
          .querySelector("#purpose")
          .value;
      let error =
        validateReceiver(receiver);
      if (error) {
        showToast(error);
        return;
      }
      error =
        validateAmount(amount);
      if (error) {
        showToast(error);
        return;
      }

      const wallet =
        loadData();
      error =
        validateBalance(
          wallet.balance,
          amount
        );

      if (error) {
        showToast(error);
        return;
      }

      wallet.balance -= Number(amount);
      wallet.totalDebit += Number(amount);

      wallet.transactions.unshift({
        id: generateId(),
        receiver,
        purpose,
        type: "Debit",
        amount: Number(amount),
        date: getCurrentDate()
      });

      saveData(wallet);
      renderDashboard(wallet);
      renderTransactions(wallet.transactions);
      e.target.reset();
    }
  );