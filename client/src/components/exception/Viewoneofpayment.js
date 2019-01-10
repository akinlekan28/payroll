import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteOneOffPayment } from "../../actions/exceptionActions";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

class ViewOtherException extends Component {
  onDelete(id) {
    confirmAlert({
      title: "Delete this oneoff payment ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes delete!",
          onClick: () => {
            this.props
              .deleteOneOffPayment(id)
              .then(res => {
                if (res.type === "DELETE_ONE_OFF_PAYMENT") {
                  toast.success("Oneoff payment exception Deleted!");
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
    const { oneoffpayment } = this.props;

    const formatMoney = money => {
      let formatedValue = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    let exceptionContainer;

    if (Object.keys(oneoffpayment).length === 0)
      return (exceptionContainer = <h4>There are no data in the system</h4>);

    exceptionContainer = oneoffpayment.map(oneoffpaymmentItem => (
      <div
        key={oneoffpaymmentItem._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-2">
          <strong>One off payment name</strong>: {oneoffpaymmentItem.name}
        </p>
        <p className="mt-2">
          <strong>Employee name</strong>: {oneoffpaymmentItem.employeeName}
        </p>
        <p className="mt-2">
          <strong>Exception type</strong>:{" "}
          {oneoffpaymmentItem.costType === "income" ? "Income" : "Deduction"}
        </p>
        <p className="mt-2">
          <strong>Amount</strong> : <span>&#8358;</span>{" "}
          {formatMoney(oneoffpaymmentItem.amount)}
        </p>
        <p className="mt-2">
          <strong>Month of payment</strong> : {oneoffpaymmentItem.month}
        </p>
        <div className="text-center mb-3">
          <button
            className="btn btn-sm btn-danger"
            onClick={this.onDelete.bind(this, oneoffpaymmentItem._id)}
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
  oneoffpayment: PropTypes.array.isRequired,
  deleteOneOffPayment: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteOneOffPayment }
)(ViewOtherException);
