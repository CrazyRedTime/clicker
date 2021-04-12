const storageName = 'Clicker';
export const loadState = () => {
try {
  const localState = localStorage.getItem(storageName);
  if (localState === null) {
    return undefined;
  }
  return JSON.parse(localState);
} catch(err) {
  return undefined;
}
};


export const saveState = state => {
try {
  const localState = JSON.stringify(state);
  localStorage.setItem(storageName, localState);
} catch(err) {
  throw err;
}
};