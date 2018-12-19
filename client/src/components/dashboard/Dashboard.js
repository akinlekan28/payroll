import React, { Component } from 'react'
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import Footer from './Footer';

class Dashboard extends Component {
  render() {
    return (
      <div id="app">
        <div className="main-wrapper">
            <div className="navbar-bg">
            </div>
            <SearchBar />
            <SideBar />
            <div className="main-content">
                <section className="section">
                <div className="section-header">
                    <h1>Dashboard</h1>
                </div>
                
                Hello world

                </section>
            </div>
            <Footer />
        </div>
      </div>
    )
  }
}

export default Dashboard;
