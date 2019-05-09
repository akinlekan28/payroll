import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { months } from "../../../common/Utilities";
import { getEmployees } from "../../../../actions/employeeActions";
import { getMonthlyPayslip } from "../../../../actions/payrollActions";
import SelectListGroup from "../../../common/SelectListGroup";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import Spinner from "../../../common/Spinner";
import { toast } from "react-toastify";
import MonthlySlipRecordTable from "./MonthlySlipRecordTable";
import { PDFExport } from "@progress/kendo-react-pdf";
import Button from "../../../common/Button";

export class MonthlySlipRecord extends PureComponent {
  static propTypes = {
    getEmployees: PropTypes.func.isRequired,
    employees: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      employee: "",
      month: "",
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
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Fetching payslip "
    loadingBtn.appendChild(loadingComp)

    const { employee, month } = this.state;

    const payslipData = {
      employee,
      month
    };

    this.props
      .getMonthlyPayslip(payslipData)
      .then(res => {
        if (res.type === "GET_ERRORS" && res.payload.monthlyslip) {
          toast.warn(res.payload.monthlyslip);
        }
        loadingBtn.innerHTML = "Get Payslip"
      })
      .catch(err => console.log(err));
  }

  exportPDF = () => {
    this.resume.save();
  };

  render() {
    let date = new Date();
    const year = date.getFullYear();

    const { errors } = this.state;
    const { employees, loading } = this.props.employees;
    const { payrollRecordsMonthly } = this.props.payrollRecordsMonthly;

    let searchContainer, monthlyPayslipContainer;

    if (employees === null || loading) {
      searchContainer = <Spinner />;
    } else {
      if (Object.keys(employees).length > 0) {
        searchContainer = (
          <div>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="card-body mt-4">
                  <form onSubmit={this.onSubmit}>
                    <SelectListGroup
                      label="Employee"
                      placeholder="Select employee level"
                      name="employee"
                      value={this.state.employee}
                      onChange={this.onChange}
                      options={employees}
                      error={errors.employee}
                    />

                    <SelectListGroup
                      label="Month"
                      placeholder="Select month"
                      name="month"
                      value={this.state.month}
                      onChange={this.onChange}
                      options={months}
                      error={errors.month}
                    />

                    <div className="text-center mx-auto">
                      <Button
                        type="submit"
                        classnameItems="btn-info btn-lg"
                        btnName="Get payslip"
                      />
                      <Link
                        to="/payroll/all"
                        className="btn btn-lg btn-warning"
                      >
                        Back
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );

        if (
          payrollRecordsMonthly === null ||
          this.props.payrollRecordsMonthly.loading
        ) {
          monthlyPayslipContainer = <Spinner />;
        } else {
          if (Object.keys(payrollRecordsMonthly).length > 0) {
            monthlyPayslipContainer = (
              <Fragment>
                <PDFExport
                  paperSize={"Letter"}
                  fileName={
                    payrollRecordsMonthly.name +
                    " payslip_" +
                    payrollRecordsMonthly.presentMonth
                  }
                  title={
                    payrollRecordsMonthly.name +
                    " payslip_" +
                    payrollRecordsMonthly.presentMonth
                  }
                  subject=""
                  keywords=""
                  ref={r => (this.resume = r)}
                >
                  <MonthlySlipRecordTable payroll={payrollRecordsMonthly} />
                </PDFExport>
                <div className="text-center mb-5">
                  <Button
                    classnameItems="btn-lg btn-success"
                    onClick={this.exportPDF}
                    btnName="Download payslip PDF"
                  />
                </div>
              </Fragment>
            );
          } else {
            monthlyPayslipContainer = "";
          }
        }
      } else {
        searchContainer = <h4>No previous employee entries in the system</h4>;
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
                <h1>Payroll report</h1>
              </div>

              <h4 className="text-center mt-4">
                Search generated employee payslip within any month for the year{" "}
                {year}
              </h4>
              {searchContainer}
              {monthlyPayslipContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees,
  payrollRecordsMonthly: state.payroll,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getEmployees, getMonthlyPayslip }
)(MonthlySlipRecord);
