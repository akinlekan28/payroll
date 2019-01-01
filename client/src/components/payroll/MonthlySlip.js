import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import { getPayroll } from "../../actions/payrollActions";
import PayslipTable from "./PayslipTable";
import { toast } from "react-toastify";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPrint from "react-to-print";
import { PDFExport } from "@progress/kendo-react-pdf";

class MonthlySlip extends PureComponent {
  componentDidMount = () => {
    this.props
      .getPayroll(this.props.match.params.id)
      .then(res => {
        if (res.type === "GET_ERRORS") {
          toast.error(res.payload.message);
          setTimeout(function() {
            window.location.href = "/payroll/monthly";
          }, 5000);
        }
      })
      .catch(err => console.log(err));
  };

  exportPDF = () => {
    this.resume.save();
  };

  render() {
    const { payroll, loading } = this.props.payroll;

    let payslipTable;

    if (payroll === null || loading) {
      payslipTable = <Spinner />;
    } else {
      if (Object.keys(payroll).length > 0) {
        payslipTable = (
          <div>
            <PDFExport
              paperSize={"Letter"}
              fileName={payroll.employeeDetails.name + " payslip"}
              title={payroll.employeeDetails.name + " payslip"}
              subject=""
              keywords=""
              ref={r => (this.resume = r)}
            >
              <PayslipTable
                payroll={payroll}
                ref={el => (this.componentRef = el)}
              />
            </PDFExport>
            <div className="text-center">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-primary btn-lg mr-4"
                table="table-to-xls"
                filename={payroll.employeeDetails.name}
                sheet={payroll.employeeDetails.name + " payslip"}
                buttonText="Download Payslip excel"
              />

              <ReactToPrint
                trigger={() => (
                  <Link to="#" className="btn btn-lg btn-warning">
                    Print payslip
                  </Link>
                )}
                content={() => this.componentRef}
              />

              <button
                className="btn btn-lg btn-success ml-3"
                onClick={this.exportPDF}
              >
                Download payslip Pdf
              </button>
            </div>
          </div>
        );
      } else {
        payslipTable = <h4>No previous employee entries!</h4>;
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
                <h1>Employee monthly payslip</h1>
              </div>
              {payslipTable}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

MonthlySlip.propTypes = {
  getPayroll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  payroll: state.payroll
});

export default connect(
  mapStateToProps,
  { getPayroll }
)(MonthlySlip);
