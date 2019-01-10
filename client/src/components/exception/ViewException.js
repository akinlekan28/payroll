import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteException } from "../../actions/exceptionActions";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

class ViewException extends Component {
  onDelete(id) {
    confirmAlert({
      title: "Delete this exception ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes delete exception!",
          onClick: () => {
            this.props
              .deleteException(id)
              .then(res => {
                if (res.type === "DELETE_EXCEPTION") {
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
    const { exceptions } = this.props;

    const formatMoney = money => {
      let formatedValue = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    let exceptionContainer;

    if (Object.keys(exceptions).length === 0)
      return (exceptionContainer = <h4>There are no data in the system</h4>);

    exceptionContainer = exceptions.map(exceptionItem => (
      <div
        key={exceptionItem._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-2">
          <strong>Employee name</strong>: {exceptionItem.name}
        </p>
        <p className="mt-2">
          <strong>Amount</strong> : <span>&#8358;</span>{" "}
          {formatMoney(exceptionItem.amount)}
        </p>
        <div className="text-center">
          <button
            className="btn btn-sm btn-danger"
            onClick={this.onDelete.bind(this, exceptionItem._id)}
          >
            Delete
          </button>
        </div>
        <hr />
      </div>
    ));

    return <div className="row">{exceptionContainer}</div>;
  }
}

ViewException.propTypes = {
  exceptions: PropTypes.array.isRequired,
  deleteException: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteException }
)(ViewException);
