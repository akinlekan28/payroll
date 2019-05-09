import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Button = ({ type, classnameItems, btnName, onClick }) => (
  <button
    type={type}
    className={classnames("btn loading", classnameItems)}
    tabIndex="4"
    onClick={onClick}
  >
    {btnName}
  </button>
);

Button.propTypes = {
  btnName: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: "button"
};

export default Button;
