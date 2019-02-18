import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import Spinner from "../common/Spinner";

export default () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  let employeeId = window.location.pathname;
  employeeId = employeeId.replace("/employee/view/", "");

  useEffect(() => {
    Axios.get(`/api/employee/single/${employeeId}`)
      .then(res => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  let employeeProfileContainer;

  if (loading) {
    employeeProfileContainer = <Spinner />;
  } else {
    if (Object.keys(employee).length > 0) {
      employeeProfileContainer = (
        <div className="col-md-6">
          <div className="card card-hero">
            <div className="card-header">
              <div className="card-icon">
                <i className="far fa-address-book" />
              </div>
              <h4 className="text-center">{employee.name}</h4>
              <div className="card-description">
                {employee.levelName} employee
                <br />
                Employee tag: {employee.tag}
              </div>
            </div>
            <div className="card-body p-0">
              <div className="tickets-list">
                <div className="ticket-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>Designation</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.designation}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>Department</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.department}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ticket-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>Email</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.email}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>State of Residence</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.stateResidence}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ticket-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>Bank Name</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.bankName}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>Account Number</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.accountNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ticket-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>PFA Name</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.pfaName}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ticket-title">
                        <h4>Pension Account Number</h4>
                      </div>
                      <div className="ticket-info">
                        <div>{employee.pensionAccountNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <Link to="/employee/all" className="btn btn-lg btn-warning m-2">
              Employee List
            </Link>
            <Link
              to={`/employee/edit/${employeeId}`}
              className="btn btn-lg btn-primary m-2"
            >
              Edit
            </Link>
          </div>
        </div>
      );
    } else {
      employeeProfileContainer = <h4>Employee profile not found</h4>;
    }
  }

  console.log(employee);
  return (
    <div id="app">
      <div className="main-wrapper">
        <div className="navbar-bg" />
        <SearchBar />
        <SideBar />
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Employee profile</h1>
            </div>
            <div className="row justify-content-center">
              {employeeProfileContainer}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};
