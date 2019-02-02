import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const SalaryPay = (props) => {

    const data = {
        labels: [
            "Net Pay",
            "Consolidation Relief Allowance",
            "Bonuses"
        ],
        datasets: [{
            data: [
                props.net,
                props.cra,
                props.bonus,
            ],
            backgroundColor: [
                '#3ECACA',
                '#808080',
                '#4a4a4a'
            ]
        }]
    }

  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <Doughnut data={data} height={160} className="justify-content-center"/>
        </div>
      </div>
    </div>
  )
}

export default SalaryPay
