// This file contains only static data.
// No functions.
// No DOM.
// No LocalStorage.
// No Events.

//tranctation purposes
const PURPOSES = [
    "Food",
    "Shopping",
    "Travel",
    "Bills",
    "Recharge",
    "Entertainment",
    "Health",
];

//transaction types
const TRANSACTION_TYPES = [
    "Credit",
    "Debit",
];

//filter options
const FILTER_OPTIONS = [
    "All",
    "Credit",
    "Debit",
];

//sort options
const SORT_OPTIONS = [
    "Latest",
    "Oldest",
    "Highest Amount",
    "Lowest Amount",
];

//default wallet data
const DEFAULT_WALLET = {
    balance:0,
    totalCredit:0,
    totalDebit:0,
    transactions:[],
};