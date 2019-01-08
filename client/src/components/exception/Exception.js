import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEmployees } from "../../actions/employeeActions";
import {getExceptions, getOtherExceptions, getOneOffPayments} from '../../actions/exceptionActions';
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import ExceptionTab from './ExceptionTab'; 
import Spinner from '../common/Spinner';
import AddExceptionForm from './AddExceptionForm';
import ViewException from './ViewException';
import AddOtherExceptionForm from './AddOtherExceptionForm';
import ViewOtherException from './ViewOtherException';
import Addoneoffpayment from './Addoneoffpayment';
import Viewoneofpayment from './Viewoneofpayment';


class Exception extends Component {

    componentDidMount = () => {
      this.props.getEmployees();
      this.props.getExceptions();
      this.props.getOtherExceptions();
      this.props.getOneOffPayments();
    }
    
  render() {
      const {employees, loading} = this.props.employees
      const {exceptions, otherexception, oneoffpayment} = this.props.exceptions

      let exceptionContainer;

      if(employees === null || exceptions === null || otherexception === null || oneoffpayment === null || loading){
          exceptionContainer = <Spinner />
      } else {
          exceptionContainer = (
            <div className="tab-content no-padding" id="myTab2Content">
            <div
              className="tab-pane fade show active"
              id="addexception"
              role="tabpanel"
              aria-labelledby="addexception-tab4"
            >
              <AddExceptionForm employees={employees} />
            </div>
            <div
              className="tab-pane fade"
              id="viewexception"
              role="tabpanel"
              aria-labelledby="viewexception-tab4"
            >
              <ViewException exceptions={exceptions} />
            </div>
            <div
              className="tab-pane fade"
              id="addindividual"
              role="tabpanel"
              aria-labelledby="addindividual-tab4"
            >
              <AddOtherExceptionForm employees={employees} />
            </div>
            <div
              className="tab-pane fade"
              id="viewindividual"
              role="tabpanel"
              aria-labelledby="viewindividual-tab4"
            >
              <ViewOtherException otherexception={otherexception} />
            </div>
            <div
              className="tab-pane fade"
              id="addoneoff"
              role="tabpanel"
              aria-labelledby="addoneoff-tab4"
            >
              <Addoneoffpayment employees={employees} />
            </div>
            <div
              className="tab-pane fade"
              id="viewoneoff"
              role="tabpanel"
              aria-labelledby="viewoneoff-tab4"
            >
            <Viewoneofpayment oneoffpayment={oneoffpayment} />
            </div>
          </div>
          )
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
                <h1>Salary Exception Section</h1>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>
                      From the sidebar navigation links, you can attach an exception to an employee profile
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <ExceptionTab />
                      <div className="col-12 col-sm-12 col-md-10">
                        {exceptionContainer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

Exception.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    getExceptions: PropTypes.func.isRequired,
    getOtherExceptions: PropTypes.func.isRequired,
    getOneOffPayments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    employees: state.employees,
    exceptions: state.exceptions,
    otherexceptions: state.otherexceptions,
    oneoffpayment: state.oneoffpayment
})

export default connect(mapStateToProps, {getEmployees, getExceptions, getOtherExceptions, getOneOffPayments})(Exception);
