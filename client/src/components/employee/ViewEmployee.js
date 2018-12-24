import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getEmployees} from '../../actions/employeeActions';
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import EmployeeTable from './EmployeeTable';

class ViewEmployee extends Component {

    componentDidMount(){
        this.props.getEmployees();
        
    }

  render() {

    const {employees, loading} = this.props.employees;

    let employeeTable;

    if(employees === null || loading){
        employeeTable = <Spinner />
    } else {
        if(Object.keys(employees).length > 0){
            employeeTable = (
                <EmployeeTable employees={employees} />
            )
        } else {
            employeeTable = <h4>No previous employee entries!</h4>
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
                <h1>View Employees</h1>
              </div>
              {employeeTable}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

ViewEmployee.propTypes = {
    getEmployees: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    employees: state.employees
})

export default connect(mapStateToProps, {getEmployees})(ViewEmployee);
