export const getUnits = (state) => {
  const units = Object.keys(state.production.production);
  return units;
};

export const getTotalGold = (state) => {
  return state.production.totalGold;
}

export const getUnitIncome = (state, unitName) => {
  return state.production.production[unitName].income;
}

export const getUnitLvl = (state, unitName) => {
  return state.production.production[unitName].lvl;
}

export const getUnitUpgradeCost = (state, unitName) => {
  return state.production.production[unitName].upgradeCost;
}

export const getUnitAvailability = (state, unitName) => {
  return state.production.production[unitName].isAvaible;
}

export const getUnitTickTime = (state, unitName) => {
  return state.production.production[unitName].tick;
}