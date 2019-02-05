import React from "react";
import { Pie } from "react-chartjs-2";

const OtherPays = ({ tax, pension, deduction }) => {
  const data = {
    labels: ["Tax", "Pension", "Other Deductions"],
    datasets: [
      {
        data: [tax, pension, deduction],
        backgroundColor: ["#fc544b", "#FFA426", "#63ED7A"]
      }
    ]
  };

  const options = {
    tooltips: {
      bodyFontSize: 21
    }
  };

  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <Pie
            data={data}
            height={160}
            options={options}
            className="justify-content-center"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherPays;
