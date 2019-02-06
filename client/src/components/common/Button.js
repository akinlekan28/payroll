import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Button = ({ type, classnameItems, refName, btnName }) => (
  <button
    type={type}
    className={classnames("btn", classnameItems)}
    ref={refName}
    tabIndex="4"
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
