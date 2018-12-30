import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getEmployees } from "../../actions/employeeActions";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import ExceptionTab from './ExceptionTab'; 
import Spinner from '../common/Spinner';
import AddExceptionForm from './AddExceptionForm';


class Exception extends Component {

    componentDidMount = () => {
      this.props.getEmployees();
    }
    
  render() {
      const {employees, loading} = this.props.employees

      let exceptionContainer;

      if(employees === null || loading){
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
              tab 2
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
                      From the dropdown navs, you can attach a salary exception to an employee profile
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
    getEmployees: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    employees: state.employees
})

export default connect(mapStateToProps, {getEmployees})(Exception);
