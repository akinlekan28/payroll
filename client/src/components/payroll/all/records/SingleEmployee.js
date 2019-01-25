import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEmployees } from "../../../../actions/employeeActions";
import { getEmployeeYearlySlip } from "../../../../actions/payrollActions";
import SelectListGroup from "../../../common/SelectListGroup";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import Spinner from "../../../common/Spinner";

class SingleEmployee extends Component {

    constructor(props){
        super(props);

        this.state = {
            employee: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      this.props.getEmployees();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors) {
          return {
            errors: nextProps.errors
          };
        }
        return null;
      }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){

        e.preventDefault();

        this.props.getEmployeeYearlySlip(this.state.employee)
    }
    
  render() {

    let date = new Date();
    const year = date.getFullYear();

    const { employees, loading } = this.props.employees;
    const { payrollRecords } = this.props.payrollRecords;
    const { errors } = this.state;
    let searchContainer;
    console.log(payrollRecords)

    if(employees === null || loading){
        searchContainer = <Spinner />
    } else {
        if(Object.keys(employees).length > 0){
            searchContainer = (
                <div>
                    <div className="row justify-content-center">
                        <div className="col-md-7 card">
                            <div className="card-header">
                                <h4 className="justify-content-center text-danger">
                                *All fields are required
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <SelectListGroup
                                        label="Employee"
                                        placeholder="Select employee level"
                                        name="employee"
                                        value={this.state.employee}
                                        onChange={this.onChange}
                                        error={errors.employee}
                                        options={employees}
                                    />

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-lg" tabIndex="4">
                                            Get payslips
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else{
            searchContainer = <h4>No previous employee entries in the system</h4>
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
                <h1>Aggregate payroll report</h1>
              </div>

              <h4 className="text-center mt-4">
                Generated employee payslips for the year {year}
              </h4>
              {searchContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

SingleEmployee.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    employees: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    employees: state.employees,
    payrollRecords: state.payroll
})

export default connect(mapStateToProps, {getEmployees, getEmployeeYearlySlip})(SingleEmployee);
