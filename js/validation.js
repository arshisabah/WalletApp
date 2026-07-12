const validateAmount = amount => {

    if(amount === "")
        return "Amount cannot be empty";

    if(isNaN(amount))
        return "Amount must be a number";

    if(Number(amount) <= 0)
        return "Amount must be greater than zero";

    return "";
};

const validateReceiver = receiver => {
    if(receiver.trim() === "")
        return "Receiver required";

    return "";
};

const validateBalance = (balance, amount) => {
    if(Number(amount) > balance)
        return "Insufficient balance";

    return "";
};
