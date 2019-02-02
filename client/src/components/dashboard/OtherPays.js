import React from 'react'
import { Pie } from 'react-chartjs-2';

const OtherPays = (props) => {

    const data = {
        labels: [
            "Tax",
            "Pension",
            "Other Deductions"
        ],
        datasets: [{
            data: [
                props.tax,
                props.pension,
                props.deduction,
            ],
            backgroundColor: [
                '#fc544b',
                '#FFA426',
                '#63ED7A'
            ]
        }]
    }

  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <Pie data={data} height={160} className="justify-content-center"/>
        </div>
      </div>
    </div>
  )
}

export default OtherPays
