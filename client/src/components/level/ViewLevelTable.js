import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatMoney } from '../common/Utilities';
// import PropTypes from "prop-types";
import { deleteLevel } from '../../actions/levelActions';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import SelectListGroup from '../common/SelectListGroup';
import Pagination from '../common/Pagination';

class ViewLevelTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      levelPerPage: '5',
    };

    this.onChange = this.onChange.bind(this);
  }

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    });
  }

  deleteDialog(id) {
    confirmAlert({
      title: 'Delete employee level ?',
      message: 'Are you sure to do this',
      buttons: [
        {
          label: 'Yes Delete level!',
          onClick: () => {
            this.props
              .deleteLevel(id)
              .then((res) => {
                if (res.type === 'DELETE_LEVEL') {
                  toast.success('Employee level deleted!');
                } else {
                  if (res.type === 'GET_ERRORS')
                    toast.error(`${res.payload.message}`);
                }
              })
              .catch((err) => console.log(err));
          },
        },
        {
          label: 'No cancel delete!',
          onClick: () => {},
        },
      ],
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { levels } = this.props;
    const { currentPage, levelPerPage } = this.state;

    const indexOfLastLevel = currentPage * levelPerPage;
    const indexOfFirstLevel = indexOfLastLevel - levelPerPage;
    const currentLevel = levels.slice(
      indexOfFirstLevel,
      indexOfLastLevel
    );
    let paginateVisibility = parseInt(levelPerPage);

    let recordGroup = [
      { _id: '5', name: '5' },
      { name: '10', _id: '10' },
      { name: '20', _id: '20' },
      { name: '30', _id: '30' },
    ];

    const levelTableContainer = currentLevel.map((level) => (
      <tr key={level._id}>
        <td>{level.name}</td>
        <td>
          <span>&#8358;</span> {formatMoney(level.basic)}
        </td>
        <td>{level.description}</td>
        <td>
          <Link
            to={`/utilities/level/editlevel/${level._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>{' '}
          <button
            className="btn btn-danger btn-sm"
            onClick={this.deleteDialog.bind(this, level._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-header">
            <h4 className="justify-content-center">
              View all employee levels
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <SelectListGroup
                  label="Record per page"
                  placeholder="Select record per page"
                  name="levelPerPage"
                  value={this.state.levelPerPage}
                  onChange={this.onChange}
                  options={recordGroup}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-stripped" id="table-1">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Basic Salary</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{levelTableContainer}</tbody>
              </table>
            </div>
            {levels.length < paginateVisibility ? (
              ''
            ) : (
              <Pagination
                employeePerPage={levelPerPage}
                totalEmployees={levels.length}
                paginate={this.paginate.bind(this)}
                currentPage={currentPage}
                currentLevel={currentLevel}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// ViewLevelTable.proptypes = {
//   levels: PropTypes.array.isRequired,
//   deleteLevel: PropTypes.func.isRequired
// };

export default connect(null, { deleteLevel })(ViewLevelTable);
