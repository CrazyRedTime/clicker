import { connect } from 'react-redux';
import { getUnits } from '../../redux/selectors';
import Unit from '../Unit/Unit';

const Units = ({units}) => {
  return (
    <div>
      {units.map((unit, index, units) => {
        return <Unit key={index} name={unit} nextUnit={units[index + 1]}/>
      })}
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    units: getUnits(state)
  }
}

export default connect(mapStateToProps, null)(Units);