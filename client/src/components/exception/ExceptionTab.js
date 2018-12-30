import React from "react";

const ExceptionTab = () => {
  return (
    <div className="col-12 col-sm-12 col-md-2">
      <ul className="nav nav-pills flex-column" id="myTab4" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="addexception-tab4"
            data-toggle="tab"
            href="#addexception"
            role="tab"
            aria-controls="addexception"
            aria-selected="true"
          >
            Add Exception
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="viewexception-tab4"
            data-toggle="tab"
            href="#viewexception"
            role="tab"
            aria-controls="viewexception"
            aria-selected="false"
          >
            View Exceptions
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ExceptionTab;
