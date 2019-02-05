import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const Netpay = ({ net }) => {
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
        pointRadius: 4,
        fill: false,
        borderColor: "rgb(62, 202, 202)"
      },
      {
        label: "Gross Earnings",
        data: [
          net.grossJan,
          net.grossFeb,
          net.grossMar,
          net.grossApr,
          net.grossMay,
          net.grossJun,
          net.grossJul,
          net.grossAug,
          net.grossSep,
          net.grossOct,
          net.grossNov,
          net.grossDec
        ],
        backgroundColor: "#C0998A",
        pointRadius: 4,
        fill: false,
        borderColor: "#C0998A"
      }
    ]
  };

  const options = {
    tooltips: {
      titleFontSize: 15,
      bodyFontSize: 19
    }
  };

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <Line data={data} height={90} options={options} />
        </div>
      </div>
    </div>
  );
};

Netpay.propTypes = {
  net: PropTypes.object.isRequired
};

export default Netpay;
