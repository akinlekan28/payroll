import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import Pagination from '../common/Pagination';

class MonthlySalaryTable extends Component {

  constructor(props){
    super(props)

    this.state = {
      search: '',
      currentPage: 1,
      employeePerPage: "5"
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

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber
    })
  }

  render() {
    const { employees } = this.props;
    const { currentPage, employeePerPage } = this.state;

    const indexOfLastEmployee = currentPage * employeePerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeePerPage;
    const currentEmployee = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    let paginateVisibility = parseInt(employeePerPage);
    let recordGroup = [
      { _id: "5", name: "5" },
      { name: "10", _id: "10" },
      { name: "20", _id: "20" },
      { name: "30", _id: "30" }
    ]

    let employeeDetails = currentEmployee.map(employee => (
      <tr key={employee._id} id="search-item">
        <td>{employee.name}</td>
        <td>{employee.levelName}</td>
        <td>{employee.department}</td>
        <td>{employee.designation}</td>
        <td>
          <Link
            to={`/payroll/monthly/viewslip/${employee._id}`}
            className="btn btn-info btn-sm"
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
              <div className="row">
                <div className="col-md-3">
                  <TextFieldGroup
                    type="text"
                    name="search"
                    label="Search payslip"
                    placeholder="Employee tag or name"
                    value={this.state.search}
                    onChange={this.onChange}
                    tabindex="1"
                    className="live-search"
                  />
                </div>
                <div className="col-md-2">
                  <SelectListGroup
                    label="Record per page"
                    placeholder="Select record per page"
                    name="employeePerPage"
                    value={this.state.employeePerPage}
                    onChange={this.onChange}
                    options={recordGroup}
                  />
                </div>
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
              {employees.length < paginateVisibility ? '' : (<Pagination employeePerPage={employeePerPage} totalEmployees={employees.length} paginate={this.paginate.bind(this)} currentPage={currentPage} currentLevel={currentEmployee} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MonthlySalaryTable;
