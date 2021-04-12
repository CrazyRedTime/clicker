import { connect } from "react-redux";
import { getTotalGold } from "../../redux/selectors";

const Resourses = ({ totalGold }) => {
  return (
    <div>
      <span>Всего золота: {totalGold}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    totalGold: getTotalGold(state),
  };
};

export default connect(mapStateToProps, null)(Resourses);
