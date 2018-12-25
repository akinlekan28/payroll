import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEmployee, editEmployee } from "../../actions/employeeActions";
import { getLevels } from "../../actions/levelActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import { toast } from "react-toastify";

class EditEmployee extends Component {
  componentDidMount() {
    this.props.getEmployee(this.props.match.params.id);
    this.props.getLevels();
  }

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      designation: "",
      department: "",
      level: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.employee) {
      const employee = nextProps.employee.employee;

      employee.name = !isEmpty(employee.name) ? employee.name : "";
      employee.email = !isEmpty(employee.email) ? employee.email : "";
      employee.designation = !isEmpty(employee.designation)
        ? employee.designation
        : "";
      employee.department = !isEmpty(employee.department)
        ? employee.department
        : "";

      this.setState({
        name: employee.name,
        email: employee.email,
        designation: employee.designation,
        department: employee.department
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const employeeData = {
      name: this.state.name,
      email: this.state.email,
      designation: this.state.designation,
      department: this.state.department,
      level: this.state.level
    };

    this.props
      .editEmployee(this.props.match.params.id, employeeData)
      .then(res => {
        if (res.type === "ADD_EMPLOYEE")
          toast.success("Employee information successfully edited!");
        this.setState({
          name: "",
          email: "",
          designation: "",
          department: ""
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { errors } = this.state;

    const { employee, loading } = this.props.employee;
    const { levels } = this.props.levels;

    let editEmployeeContainer;
    let levelContainer;

    if (levels === null || this.props.levels.loading) {
      levelContainer = <Spinner />;
    } else {
      if (Object.keys(levels).length > 0) {
        levelContainer = (
          <SelectListGroup
            label="Employee level"
            placeholder="Select employee level"
            name="level"
            value={this.state.level}
            onChange={this.onChange}
            error={errors.level}
            options={levels}
          />
        );
      } else {
        levelContainer = <option>No level found</option>;
      }
    }

    if (employee === null || loading) {
      editEmployeeContainer = <Spinner />;
    } else {
      if (employee) {
        editEmployeeContainer = (
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

                      {levelContainer}

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          tabIndex="4"
                        >
                          Edit Employee
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
        editEmployeeContainer = <h4>Employee record not found</h4>;
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
                <h1>Edit Employee </h1>
              </div>
              {editEmployeeContainer}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

EditEmployee.propTypes = {
  getEmployee: PropTypes.func.isRequired,
  getLevels: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  employee: state.employees,
  levels: state.levels
});

export default connect(
  mapStateToProps,
  { getEmployee, getLevels, editEmployee }
)(EditEmployee);
