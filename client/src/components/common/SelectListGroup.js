import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  label
}) => {

  const selectOptions = options.map(option => (
    <option key={option._id} value={option._id}>
      {option.name}
    </option>
  ))

  return (
    <div>
      <div className="form-group">
      <label htmlFor={label}>{label}</label>
        <select
          className={classnames('form-control', {
            'is-invalid': error
          })}
          name={name}
          value={value}
          onChange={onChange}
        >
        <option value="">Select an option</option>
          {selectOptions}

        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
}

export default SelectListGroup;
