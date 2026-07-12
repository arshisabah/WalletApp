const STORAGE_KEY = "wallet";

const saveData = data => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

const loadData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : JSON.parse(JSON.stringify(DEFAULT_WALLET));
}