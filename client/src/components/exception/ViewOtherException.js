import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteOtherException } from "../../actions/exceptionActions";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

class ViewOtherException extends Component {
  onDelete(id) {
    confirmAlert({
      title: "Delete this exception ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes delete exception!",
          onClick: () => {
            this.props
              .deleteOtherException(id)
              .then(res => {
                if (res.type === "DELETE_OTHER_EXCEPTION") {
                  toast.success("Exception Deleted!");
                }
              })
              .catch(err => console.log(err));
          }
        },
        {
          label: "No cancel delete!",
          onClick: () => {}
        }
      ]
    });
  }

  render() {
    const { otherexception } = this.props;

    const formatMoney = money => {
      let formatedValue = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    let exceptionContainer;

    if (Object.keys(otherexception).length === 0)
      return (exceptionContainer = <h4>There's no data in the system</h4>);

    exceptionContainer = otherexception.map(exceptionItem => (
      <div
        key={exceptionItem._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-2">
          <strong>Exception name</strong>: {exceptionItem.name}
        </p>
        <p className="mt-2">
          <strong>Employee name</strong>: {exceptionItem.employeeName}
        </p>
        <p className="mt-2">
          <strong>Exception type</strong>:{" "}
          {exceptionItem.costType === "income" ? "Income" : "Deduction"}
        </p>
        <p className="mt-2">
          <strong>Amount</strong> : <span>&#8358;</span>{" "}
          {formatMoney(exceptionItem.amount)}
        </p>
        <div className="text-center mb-3">
          <button
            className="btn btn-sm btn-danger"
            onClick={this.onDelete.bind(this, exceptionItem._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));

    return <div className="row">{exceptionContainer}</div>;
  }
}

ViewOtherException.propTypes = {
  otherexception: PropTypes.array.isRequired,
  deleteOtherException: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteOtherException }
)(ViewOtherException);
