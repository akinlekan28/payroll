import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getLevels} from '../../actions/levelActions';

class ViewLevelTable extends Component {

  componentDidMount(){
    this.props.getLevels();
  }

  deleteDialog(id){

  }

  render() {
    const {levels, loading} = this.props.levels;

    let levelTableContainer;

    if(levels === null || loading){
      levelTableContainer = <tr>
      <td>loading...</td>
    </tr>
    } else {
      if(Object.keys(levels).length > 0){
        levelTableContainer = levels.map(level => (
          <tr key={level._id}>
        <td>{level.name}</td>
        <td>{level.basic}</td>
        <td>{level.description}</td>
        <td>
          <Link
            to={`/level/edit/${level._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>{" "}
          <button
            className="btn btn-danger btn-sm"
            onClick={this.deleteDialog.bind(this, level._id)}
          >
            Delete
          </button>
        </td>
      </tr>
        ))
      } else {
        levelTableContainer = <tr>
          <td>No previous entries</td>
        </tr>
      }
    }

    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-header">
            <h4 className="justify-content-center">View all employee levels</h4>
          </div>
          <div className="card-body">
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
          </div>
        </div>
      </div>
    );
  }
}

ViewLevelTable.proptypes = {
  getLevels: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  levels: state.levels
})

export default connect(mapStateToProps, {getLevels})(ViewLevelTable);
