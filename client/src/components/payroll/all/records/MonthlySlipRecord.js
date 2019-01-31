import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEmployees } from "../../../../actions/employeeActions";
import { getMonthlyPayslip } from "../../../../actions/payrollActions";
import SelectListGroup from "../../../common/SelectListGroup";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import Spinner from "../../../common/Spinner";
import { toast } from "react-toastify";
import MonthlySlipRecordTable from "./MonthlySlipRecordTable";
import ReactToPrint from "react-to-print";
import { PDFExport } from "@progress/kendo-react-pdf";

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
    const months = [
      { name: "January", value: "January", _id: "January" },
      { name: "February", value: "February", _id: "February" },
      { name: "March", value: "March", _id: "March" },
      { name: "April", value: "April", _id: "April" },
      { name: "May", value: "May", _id: "May" },
      { name: "June", value: "June", _id: "June" },
      { name: "July", value: "July", _id: "July" },
      { name: "August", value: "August", _id: "August" },
      { name: "September", value: "September", _id: "September" },
      { name: "October", value: "October", _id: "October" },
      { name: "November", value: "November", _id: "November" },
      { name: "December", value: "December", _id: "December" }
    ];

    let searchContainer, monthlyPayslipContainer;

    if (employees === null || loading) {
      searchContainer = <Spinner />;
    } else {
      if (Object.keys(employees).length > 0) {
        searchContainer = (
          <div>
            <div className="row">
              <div className="col-md-10">
                <div className="card-body mt-4">
                  <form onSubmit={this.onSubmit} className="form-inline">
                    <div className="col-md-4">
                      <SelectListGroup
                        label="Employee&nbsp;"
                        placeholder="Select employee level"
                        name="employee"
                        value={this.state.employee}
                        onChange={this.onChange}
                        options={employees}
                        error={errors.employee}
                      />
                    </div>
                    <div className="col-md-3">
                      <SelectListGroup
                        label="Month&nbsp;"
                        placeholder="Select month"
                        name="month"
                        value={this.state.month}
                        onChange={this.onChange}
                        options={months}
                        error={errors.month}
                      />
                    </div>
                    <div className="col-md-3">
                      <button
                        type="submit"
                        className="btn btn-info btn-lg"
                        tabIndex="4"
                      >
                        Get payslip
                      </button>
                    </div>
                    <div className="col-md-2">
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
                  {/* <ReactToPrint
                    trigger={() => (
                      <Link to="#" className="btn btn-lg btn-info">
                        Print payslip
                      </Link>
                    )}
                    content={() => this.componentRef}
                  /> */}

                  <button
                    className="btn btn-lg btn-success ml-3"
                    onClick={this.exportPDF}
                  >
                    Download payslip Pdf
                  </button>
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
