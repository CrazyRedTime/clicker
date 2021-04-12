import { connect } from "react-redux";
import styles from "./Unit.module.css";
import { upgrade, buy, tick } from "../../redux/production";
import { useEffect } from "react";
import { getTotalGold, getUnitAvailability, getUnitIncome, getUnitLvl, getUnitTickTime, getUnitUpgradeCost } from "../../redux/selectors";

const Unit = ({
  name,
  nextUnit,
  isAvaible,
  totalGold,
  income,
  unitLvl,
  upgradeCost,
  upgrade,
  buy,
  tick,
  tickTime,
}) => {
  useEffect(() => {
    if (unitLvl) {
      let timerId = setInterval(() => tick(name), tickTime);
      return () => clearInterval(timerId);
    }
  }, [tick, tickTime, name, unitLvl]);

  if (!isAvaible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <span>Уровень: {unitLvl}</span>
      <span>Текущий доход: {income}</span>
      <button
        disabled={totalGold < upgradeCost}
        onClick={() => {
          unitLvl ? upgrade(name) : buy(name, nextUnit);
        }}
      >
        {unitLvl ? `Улучшить за ${upgradeCost}` : `Купить за ${upgradeCost}`}
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const unitName = ownProps.name;

  return {
    totalGold: getTotalGold(state),
    income: getUnitIncome(state, unitName),
    unitLvl: getUnitLvl(state, unitName),
    upgradeCost: getUnitUpgradeCost(state, unitName),
    isAvaible: getUnitAvailability(state, unitName),
    tickTime: getUnitTickTime(state, unitName),
  };
};

export default connect(mapStateToProps, { upgrade, buy, tick })(Unit);
