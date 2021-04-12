const initialState = {
  totalGold: 0,
  production: {
    man: {
      income: 1,
      lvl: 1,
      upgradeCost: 5,
      tick: 1000,
      isAvaible: true,
    },
    cow: {
      income: 1000,
      lvl: 0,
      upgradeCost: 5000,
      tick: 2000,
      isAvaible: true,
    },
    car: {
      income: 20000,
      lvl: 0,
      upgradeCost: 100000,
      tick: 4000,
      isAvaible: false,
    },
  },
};

const production = (state = initialState, { type, payload }) => {
  const specialLvls = [10, 25, 50, 100];

  switch (type) {
    case "TICK":
      const newGold = state.totalGold + state.production[payload].income;
      return {
        ...state,
        totalGold: newGold,
      };

    case "BUY":
      const newState = {
        ...state,
        totalGold:
          state.totalGold - state.production[payload.currentUnit].upgradeCost,
        production: {
          ...state.production,
          [payload.currentUnit]: {
            ...state.production[payload.currentUnit],
            lvl: state.production[payload.currentUnit].lvl + 1,
          },
        },
      };
      if (payload.nextUnit) {
        return {
          ...newState,
          production: {
            ...newState.production,
            [payload.nextUnit]: {
              ...state.production[payload.nextUnit],
              isAvaible: true,
            },
          },
        };
      }
      return newState;

    case "UPGRADE":
      return {
        ...state,
        totalGold: state.totalGold - state.production[payload].upgradeCost,
        production: {
          ...state.production,
          [payload]: specialLvls.includes(state.production[payload].lvl + 1)
            ? {
                ...state.production[payload],
                income: state.production[payload].income * 2,
                lvl: state.production[payload].lvl + 1,
                upgradeCost: state.production[payload].upgradeCost * 4,
                tick:
                  state.production[payload].tick > 125
                    ? state.production[payload].tick / 2
                    : state.production[payload].tick,
              }
            : {
                ...state.production[payload],
                income: Math.floor(state.production[payload].income * 1.05 + 1),
                lvl: state.production[payload].lvl + 1,
                upgradeCost: Math.floor(state.production[payload].upgradeCost * 1.1 + 1),
                tick: state.production[payload].tick,
              },
        },
      };

    default:
      return state;
  }
};

export const tick = (unit) => (dispatch) => {
  dispatch({
    type: "TICK",
    payload: unit,
  });
};

export const buy = (currentUnit, nextUnit) => (dispatch) => {
  dispatch({
    type: "BUY",
    payload: {
      currentUnit,
      nextUnit,
    },
  });
};

export const upgrade = (unit) => (dispatch) => {
  dispatch({
    type: "UPGRADE",
    payload: unit,
  });
};

export default production;
