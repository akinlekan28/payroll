import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const Netpay = props => {
  const { net } = props;

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Öctober",
      "November",
      "December"
    ],
    datasets: [
      {
        label: "Monthly Net Pay",
        data: [
          net.jan,
          net.feb,
          net.mar,
          net.apr,
          net.may,
          net.jun,
          net.jul,
          net.aug,
          net.sep,
          net.oct,
          net.nov,
          net.dec
        ],
        backgroundColor: "rgb(62, 202, 202)",
        pointRadius: 5
      }
    ]
  };

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <Line data={data} height={90} />
        </div>
      </div>
    </div>
  );
};

Netpay.propTypes = {
  net: PropTypes.object.isRequired
};

export default Netpay;
