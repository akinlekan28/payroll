import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatMoney } from "../common/Utilities";
import { deleteDeductable } from "../../actions/levelActions";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

class ViewDeductableTable extends Component {
  onDelete(levelId, bonusId) {
    confirmAlert({
      title: "Delete this deductable ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes delete!",
          onClick: () => {
            this.props
              .deleteDeductable(levelId, bonusId)
              .then(res => toast.success("Deductable Deleted!"))
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
    const { levels } = this.props;

    const DeductableContainer = levels.map(level => (
      <div
        key={level._id}
        className="col-md-4 mx-auto card card-primary mt-2 bg-light"
      >
        <p className="mt-3">
          <strong>Level Name</strong> : {level.name}
        </p>
        <p className="mt-2">
          <strong>Level Salary</strong> : <span>&#8358;</span>{" "}
          {formatMoney(level.basic)}
        </p>
        {level.deductables.length > 0 ? (
          <div>
            <h5 className="text-center">Deduction</h5>
            {level.deductables.map(deductable => (
              <div key={deductable._id} className="text-center mb-3">
                <p>Deduction name: {deductable.name}</p>
                <p>
                  Amount: <span>&#8358;</span> {formatMoney(deductable.amount)}
                </p>
                <div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={this.onDelete.bind(
                      this,
                      level._id,
                      deductable._id
                    )}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ));

    return <div className="row">{DeductableContainer}</div>;
  }
}

ViewDeductableTable.propTypes = {
  levels: PropTypes.array.isRequired,
  deleteDeductable: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteDeductable }
)(ViewDeductableTable);
