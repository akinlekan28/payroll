import React from "react";

const DeletedEmployeeCard = ({ dashboard }) => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
    <div className="card card-statistic-1">
      <div className="card-icon bg-cyan">
        <i className="fas fa-trash" />
      </div>
      <div className="card-wrap">
        <div className="card-header">
          <h4>Deleted Employees</h4>
        </div>
        <div className="card-body">{dashboard.deletedEmployees}</div>
      </div>
    </div>
  </div>
);

export default DeletedEmployeeCard;
