import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getLevels} from '../../actions/levelActions';

class ViewBonusTable extends Component {

    componentDidMount = () => {
      this.props.getLevels();
    }
    
  render() {
     
    const {levels} = this.props.levels

      let bonusTableContainer; 

      if(levels !== undefined && Object.keys(levels).length > 0){

        bonusTableContainer = levels.map(level => (
            <div key={level._id} className="col-md-5 mx-auto card card-primary mt-2">
                    <p className="mt-3"><strong>Level Name</strong> : {level.name}</p>
                    <p className="mt-2"><strong>Level Salary</strong> : {level.basic}</p>
            </div>
        ))
          
      }
        
    else {
          bonusTableContainer = (
              <div className="col-md-10 justify-content-center">
                <h4>No previous entry of employee level!</h4>
              </div>
          )
      }

    return (
        <div className="row">
            {bonusTableContainer}
        </div>
    )
  }
}

ViewBonusTable.propTypes = {
    levels: PropTypes.object.isRequired,
    getLevels: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    levels: state.levels
})

export default connect(mapStateToProps, {getLevels})(ViewBonusTable);
