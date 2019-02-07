import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { formatMoney } from "../common/Utilities";
import PropTypes from "prop-types";
import { deleteLevel } from "../../actions/levelActions";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

class ViewLevelTable extends Component {
  deleteDialog(id) {
    confirmAlert({
      title: "Delete employee level ?",
      message: "Are you sure to do this",
      buttons: [
        {
          label: "Yes Delete level!",
          onClick: () => {
            this.props
              .deleteLevel(id)
              .then(res => {
                if (res.type === "DELETE_LEVEL") {
                  toast.success("Employee level deleted!");
                } else {
                  if (res.type === "GET_ERRORS")
                    toast.error(`${res.payload.message}`);
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
    const { levels } = this.props;
    const levelTableContainer = levels.map(level => (
      <tr key={level._id}>
        <td>{level.name}</td>
        <td>
          <span>&#8358;</span> {formatMoney(level.basic)}
        </td>
        <td>{level.description}</td>
        <td>
          <Link
            to={`/utilities/level/editlevel/${level._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>{" "}
          <button
            className="btn btn-danger btn-sm"
            onClick={this.deleteDialog.bind(this, level._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-header">
            <h4 className="justify-content-center">View all employee levels</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-stripped" id="table-1">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Basic Salary</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{levelTableContainer}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewLevelTable.proptypes = {
  levels: PropTypes.array.isRequired,
  deleteLevel: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteLevel }
)(ViewLevelTable);
