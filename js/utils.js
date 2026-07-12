//helper functions

//generate unique id
const generateId = () => {
    return Date.now().toString();
};

//current date
const getCurrentDate = () => {
    return new Date().toLocaleDateString();
};

//currency formater
const formatCurrency = amount => {
    return `$${Number(amount).toLocaleString("en-IN")}`;
};

//capitalize
const capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};