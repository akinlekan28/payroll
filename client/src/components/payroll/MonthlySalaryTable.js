import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';

class MonthlySalaryTable extends Component {

  constructor(props){
    super(props)

    this.state = {
      search: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value }, () => {
      let text = this.state.search.toLowerCase()
      document.querySelectorAll('#search-item').forEach(table => {
        const item = table.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) !== -1){
          table.style.display = 'table-row'
        } else {
          table.style.display = 'none';
        }
      })
    });
  }

  render() {
    const { employees } = this.props;

    let employeeDetails = employees.map(employee => (
      <tr key={employee._id} id="search-item">
        <td>{employee.name}</td>
        <td>{employee.levelName}</td>
        <td>{employee.department}</td>
        <td>{employee.designation}</td>
        <td>
          <Link
            to={`/payroll/monthly/viewslip/${employee._id}`}
            className="btn btn-success btn-sm"
          >
            View 
          </Link>
        </td>
      </tr>
    ));

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">View to generate/export individual employee payslip</h4>
            </div>
            <div className="card-body">
            <div className="live-search">
            <TextFieldGroup
                type="text"
                name="search"
                label="Search employee"
                placeholder="Enter name"
                value={this.state.search}
                onChange={this.onChange}
                tabindex="1"
                className="live-search"
              />
           </div>
              <div className="table-responsive">
                <table className="table table-stripped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Level</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{employeeDetails}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MonthlySalaryTable;
