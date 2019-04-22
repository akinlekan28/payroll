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
import ReactToPrint from "react-to-print";
import { PDFExport } from "@progress/kendo-react-pdf";
import axios from "axios";

class MonthlySlip extends PureComponent {
  constructor(props) {
    super(props);

    this.sendEmail = this.sendEmail.bind(this);
  }
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

  sendEmail(e) {
    
    let loadingBtn = document.querySelector('.sendE');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Sending "
    loadingBtn.appendChild(loadingComp)
    loadingBtn.disabled = true;

    axios
      .post(`/api/payslip/send/${this.props.match.params.id}`)
      .then(res => {
        toast.success("Employee payslip successfully sent!");
        loadingBtn.disabled = false;
        loadingBtn.innerHTML = "Send to employee";
      })
      .catch(err => {
        toast.error("Error sending email, resend");
        loadingBtn.disabled = false;
        loadingBtn.innerHTML = "Send to employee";
      });
  }

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
                style={{
                  height: 792,
                  width: 612,
                  padding: "none",
                  backgroundColor: "white",
                  boxShadow: "5px 5px 5px black",
                  margin: "auto",
                  overflowX: "hidden",
                  overflowY: "hidden"
                }}
              />
            </PDFExport>
            <div className="text-center">
              <ReactToPrint
                trigger={() => (
                  <Link to="#" className="btn btn-lg btn-info">
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

              <button
                className="btn btn-lg btn-primary ml-3 sendE"
                onClick={this.sendEmail}
              >
                Send to employee
              </button>
              <Link to="/payroll/monthly" className="btn btn-lg btn-warning ml-3">
                Back
              </Link>
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
