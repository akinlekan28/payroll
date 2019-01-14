import React from 'react'
import SearchBar from '../dashboard/SearchBar';
import SideBar from '../dashboard/SideBar';
import Footer from '../dashboard/Footer';

export default () => {
  return (
    <div id="app">
      <div className="main-wrapper">
        <div className="navbar-bg"></div>
        <SearchBar />
        <SideBar />
        <div className="main-content">
            <section className="section">
            <div className="section-header">
                    <h1>Software Documentation</h1>
            </div>
           <div className="row">
            <div className="col-md-6 card card-body">
            Hello world
            </div>
            <div className="col-md-6 card card-body">
            Hello world
            </div>
           </div>
            </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}
