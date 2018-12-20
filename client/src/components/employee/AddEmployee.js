import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { getLevels } from "../../actions/levelActions";
import {registerEmployee} from '../../actions/employeeActions';
import Spinner from "../common/Spinner";

class AddEmployee extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      designation: "",
      department: "",
      level: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getLevels();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const employeeDetails = {
      name: this.state.name,
      email: this.state.email,
      designation: this.state.designation,
      department: this.state.department,
      level: this.state.level
    };

    this.props.registerEmployee(employeeDetails)
    .then(res => {
        if(res.type === 'ADD_EMPLOYEE')
            toast.success("Employee information saved successfully!")
    })
    .catch(err => console.log(err))
  }

  render() {
    const { levels, loading } = this.props.levels;
    const { errors } = this.state;

    let employeeForm;

    if (levels === null || loading) {
      employeeForm = <Spinner />;
    } else {
      if (Object.keys(levels).length > 0) {
        employeeForm = (
          <React.Fragment>
            <div className="row justify-content-center">
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header">
                    <h4 className="justify-content-center text-danger">
                      *All fields are required
                    </h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        type="text"
                        label="Full Name"
                        placeholder="Enter full name"
                        name="name"
                        value={this.state.name}
                        error={errors.name}
                        onChange={this.onChange}
                        tabindex="1"
                      />

                      <TextFieldGroup
                        type="email"
                        label="Email"
                        placeholder="Enter valid email"
                        name="email"
                        value={this.state.email}
                        error={errors.email}
                        onChange={this.onChange}
                        tabindex="1"
                      />

                      <TextFieldGroup
                        type="text"
                        label="Department"
                        placeholder="Enter department"
                        name="department"
                        value={this.state.department}
                        error={errors.department}
                        onChange={this.onChange}
                        tabindex="1"
                      />

                      <TextFieldGroup
                        type="text"
                        label="Designation"
                        placeholder="Enter designation"
                        name="designation"
                        value={this.state.designation}
                        error={errors.designation}
                        onChange={this.onChange}
                        tabindex="1"
                      />

                      <SelectListGroup
                        label="Employee level"
                        placeholder="Select employee level"
                        name="level"
                        value={this.state.level}
                        onChange={this.onChange}
                        error={errors.level}
                        options={levels}
                      />

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          tabIndex="4"
                        >
                          Add Employee
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        employeeForm = (
          <h4 className="text-danger">
            There's no previous employee salary level entry! Enter atleast one
            to proceed
          </h4>
        );
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
                <h1>Add Employee</h1>
              </div>
              {employeeForm}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

AddEmployee.propTypes = {
  getLevels: PropTypes.func.isRequired,
  registerEmployee: PropTypes.func.isRequired,
  levels: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  levels: state.levels
});

export default connect(
  mapStateToProps,
  { getLevels, registerEmployee }
)(AddEmployee);
