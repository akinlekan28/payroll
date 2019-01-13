import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getEmployees } from "../../actions/employeeActions";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import MonthlySalaryTable from './MonthlySalaryTable';
import axios from 'axios';
import { toast } from "react-toastify";

class MonthlySalary extends Component {

  componentDidMount() {
    this.props.getEmployees();
  }

  generateAll(employees){
    let totalEmployees = employees.length
    let completeGeneration = 0;

    employees.forEach(employee => {
      axios.get(`/api/tax/singleslip/${employee._id}`)
        .then(res => {
          if(res.status === 200){
            completeGeneration++;
          }
          if(completeGeneration === totalEmployees){
            toast.success('Aggregate payroll generation successfull!')
          }
        })
        .catch(err => console.log(err))
    })
  }

  render() {

    const { employees, loading } = this.props.employees;

    let employeeTable, generateBtn;
    let date = new Date();
    let salaryDay = date.getDate();

    if (employees === null || loading) {
      employeeTable = <Spinner />;
    } else {
      if (Object.keys(employees).length > 0) {

        employeeTable = <MonthlySalaryTable employees={employees} />;

        if(salaryDay > 21){
          generateBtn = <button className="btn btn-lg btn-success mb-4" onClick={this.generateAll.bind(this, employees)}>Bulk generate</button>
        }
        
      } else {
        employeeTable = <h4>No previous employee entries!</h4>;
        generateBtn = '';
      }
    }

    return (
      <div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg" />
          <SearchBar />
          <SideBar />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Employee monthly salary</h1>
              </div>
              {generateBtn}
              {employeeTable}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

MonthlySalary.propTypes = {
  getEmployees: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees
});

export default connect(
  mapStateToProps,
  { getEmployees }
)(MonthlySalary);
