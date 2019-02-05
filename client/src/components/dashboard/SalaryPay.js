import React from "react";
import { Doughnut } from "react-chartjs-2";

const SalaryPay = ({ net, cra, bonus }) => {
  const data = {
    labels: ["Net Pay", "Consolidation Relief Allowance", "Bonuses"],
    datasets: [
      {
        data: [net, cra, bonus],
        backgroundColor: ["#3ECACA", "#808080", "#4a4a4a"]
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
          <Doughnut
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

export default SalaryPay;
