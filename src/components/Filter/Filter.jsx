import PropTypes from 'prop-types';

const Filter = ({ onFilterChange }) => {
  return <input type="text" onChange={onFilterChange} />;
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
