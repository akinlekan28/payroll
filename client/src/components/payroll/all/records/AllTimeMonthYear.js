import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { months } from "../../../common/Utilities";
import { getMonthYear } from "../../../../actions/payrollActions";
import SelectListGroup from "../../../common/SelectListGroup";
import TextFieldGroup from "../../../common/TextFieldGroup";
import Button from "../../../common/Button";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import { toast } from "react-toastify";

export class AllTimeMonthYear extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      month: "",
      year: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { month, year } = this.state;
    const payslipData = {
      month,
      year
    };
    this.props
      .getMonthYear(payslipData)
      .then(res => {
        if (res.type === "GET_ERRORS" && res.payload.payslip) {
          toast.warn(res.payload.payslip);
        }
      })
      .catch(err => console.log(err));
  }

  exportPDF = () => {
    this.resume.save();
  };

  render() {
    const { errors } = this.state;
    const { monthYear } = this.props.monthYear;
    let payslipTableContainer;

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
                Search generated employee payslip by month and year.
              </h4>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card-body mt-3">
                    <form onSubmit={this.onSubmit}>
                      <SelectListGroup
                        label="Month"
                        placeholder="Select month"
                        name="month"
                        value={this.state.month}
                        onChange={this.onChange}
                        options={months}
                        error={errors.month}
                      />

                      <TextFieldGroup
                        label="Year"
                        type="number"
                        placeholder="Enter Year"
                        name="year"
                        value={this.state.year}
                        onChange={this.onChange}
                        error={errors.year}
                      />

                      <div className="mx-auto text-center">
                        <Button
                          type="submit"
                          classnameItems="btn-info btn-lg"
                          btnName="Get payslips"
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
              {payslipTableContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  monthYear: state.payroll,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getMonthYear }
)(AllTimeMonthYear);
