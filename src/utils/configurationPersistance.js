function save(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function get(key, defaultValue) {
  const value = window.localStorage.getItem(key);

  return value === null ? defaultValue : JSON.parse(value);
}

export {
  save,
  get,
};
