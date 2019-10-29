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
import { registerEmployee } from "../../actions/employeeActions";
import { banks } from "../common/Utilities";
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import {Link} from 'react-router-dom';

class AddEmployee extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      designation: "",
      department: "",
      level: "",
      stateResidence: "",
      bankName: "",
      accountNumber: "",
      pfaName: "",
      pensionAccountNumber: "",
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

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Adding "
    loadingBtn.appendChild(loadingComp)

    let bankName = this.state.bankName;
    bankName = bankName.toUpperCase();
    const employeeDetails = {
      name: this.state.name,
      email: this.state.email,
      designation: this.state.designation,
      department: this.state.department,
      level: this.state.level,
      stateResidence: this.state.stateResidence,
      bankName,
      accountNumber: this.state.accountNumber,
      pfaName: this.state.pfaName,
      pensionAccountNumber: this.state.pensionAccountNumber
    };

    this.props
      .registerEmployee(employeeDetails)
      .then(res => {
        if (res.type === "ADD_EMPLOYEE") {
          toast.success("Employee information saved successfully!");
          this.setState({
            name: "",
            email: "",
            designation: "",
            department: "",
            level: "",
            stateResidence: "",
            bankName: "",
            accountNumber: "",
            pfaName: "",
            pensionAccountNumber: ""
          });
        }

        loadingBtn.innerHTML = "Add Employee"
      })
      .catch(err => console.log(err));
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
                      <p className="btn-primary btn-lg mt-3"><Link to="/employee/upload" className="to-upload">Upload Employee Records</Link></p>
                    </h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <fieldset>
                        <legend className="text-center">
                          Personal Information
                        </legend>
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
                          label="State of Residence"
                          placeholder="Enter state of residence"
                          name="stateResidence"
                          value={this.state.stateResidence}
                          error={errors.stateResidence}
                          onChange={this.onChange}
                          tabindex="1"
                        />
                      </fieldset>

                      <fieldset>
                        <legend className="text-center">
                          Payslip Information
                        </legend>

                        <SelectListGroup
                          label="Bank Name"
                          name="bankName"
                          value={this.state.bankName}
                          onChange={this.onChange}
                          error={errors.bankName}
                          options={banks}
                        />

                        <TextFieldGroup
                          type="text"
                          label="Account Number"
                          placeholder="Enter account number"
                          name="accountNumber"
                          value={this.state.accountNumber}
                          error={errors.accountNumber}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          type="text"
                          label="PFA Name"
                          placeholder="Enter Pfa name"
                          name="pfaName"
                          value={this.state.pfaName}
                          error={errors.pfaName}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          type="text"
                          label="Pension Account Number"
                          placeholder="Enter account number"
                          name="pensionAccountNumber"
                          value={this.state.pensionAccountNumber}
                          error={errors.pensionAccountNumber}
                          onChange={this.onChange}
                          tabindex="1"
                        />
                      </fieldset>

                      <fieldset>
                        <legend className="text-center">
                          Company Information
                        </legend>
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
                      </fieldset>

                      <div className="text-center">
                        <Button
                          type="submit"
                          classnameItems="btn-primary btn-lg"
                          btnName="Add Employee"
                        />
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
            There's no previous employee salary level entry! Add atleast one to
            proceed
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
