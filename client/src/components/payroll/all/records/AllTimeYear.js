import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from "../../../common/TextFieldGroup";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import Spinner from "../../../common/Spinner";
import { toast } from "react-toastify";
import Button from "../../../common/Button";
import Axios from "axios";
import AllTimeYearTable from "./AllTimeYearTable";

export default () => {
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [payslips, setPayslip] = useState([]);

  const onChangeYear = e => {
    setYear(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const payslipYear = {
      year
    };
    setLoading(true);

    Axios.post(`/api/payslip/record/byyear/`, payslipYear)
      .then(res => {
        setPayslip(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err.response.data.year) {
          setError(err.response.data.year);
          setTimeout(function() {
            setError("");
          }, 5000);
          setLoading(false);
        }
        if (err.response.data.payslips) {
          toast.warn(err.response.data.payslips);
          setLoading(false);
        }
      });
  };

  let payslipTableContainer;

  if (loading) {
    payslipTableContainer = <Spinner />;
  }
  if (Object.keys(payslips).length > 0) {
    payslipTableContainer = <AllTimeYearTable payslips={payslips} />;
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
              Search generated employee payslips by year
            </h4>
            <div>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card-body mt-4">
                    <form onSubmit={onSubmit}>
                      <TextFieldGroup
                        label="Year"
                        type="number"
                        placeholder="Enter year"
                        name="year"
                        value={year}
                        error={error}
                        onChange={onChangeYear}
                      />
                      <div className="text-center mx-auto">
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
            </div>
            {payslipTableContainer}
          </section>
        </div>
      </div>
    </div>
  );
};
