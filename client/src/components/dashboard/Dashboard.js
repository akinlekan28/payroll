import React, { Component } from 'react'
import SearchBar from './SearchBar';

class Dashboard extends Component {
  render() {
    return (
      <div id="app">
        <div className="main-wrapper">
            <div className="navbar-bg">
            </div>
            <SearchBar />
        </div>
      </div>
    )
  }
}

export default Dashboard;
