import React from 'react'
import SearchBar from '../dashboard/SearchBar';
import SideBar from '../dashboard/SideBar';
import Footer from '../dashboard/Footer';

export default () => (
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
            <p><span style={{fontSize: '2.5rem', color: '#007bff'}}>Hello!</span> Good of you to check out the documentation before proceeding to use this software. It will answer most of your questions and give you a scope of how the system works.</p>
           <div className="row">
            <div className="col-md-6 card card-body card-warning">
            <h5 className="text-center mb-3">1.0    Level system</h5>
            <p>This software uses level system to calculate employee salaries and as such, you're required to add a level before proceeding to add an employee to the system.</p>
            <p>The three level fields are required to add a level to the system and the basic salary should be entered without comma.</p>
            <p>From the employee level page, you can edit and delete previously entered level informations. It also worth mentioning that an employee level cannot be <strong>deleted</strong> once an employee has been registered under such level.</p>

            <h6 className="mt-3">1.1    Level bonus(es)</h6>
            <p>From the employee level tabs, you can add a level wide bonus(es) to a specific level. </p> <p><strong>Note</strong> that this bonus(es) is added to the employee salary on a monthly basis. All employees belonging to a level will have the bonus(es) attached to such level paid to them.</p>
            <p>From the bonus tab, you can choose to delete previously entered bonus(es).</p>

            <h6 className="mt-3">1.2    Level deduction(s)</h6>
            <p>From the employee level tabs, you can add a level wide deduction(s) to a specific level. </p> <p><strong>Note</strong> that this deduction(s) is removed from the employee salary on a monthly basis. All employees belonging to a level will have the deduction(s) attached to such level removed from their salary.</p>
            <p>From the deduction(s) tab, you can choose to delete previously entered deduction(s).</p>
            
            <h6 className="mt-3">1.3     Fixed deductions</h6>
            <p>This system generates payroll based on the PAYE tax system is Nigeria and invariably calculates employee pension at the rate <strong className="text-danger">8%</strong> of the taxable income.</p>
            <p>Other company based or state based deductions can be added through the level deduction option.</p>
            </div>

            <div className="col-md-6 card card-body card-warning">
            <h5 className="text-center mb-3">2.0    Employee profile</h5>
            <p>Upon successful addition of employee level, then an employee profile can be created. Creating an employee profile requires providing employee full name, a valid and functioning email, designation, department and lastly the employee level. All the fields are required before profile creation can be successful.</p>
            <p>From the view profiles page, employees list is displayed from which a profile can be edited or deleted.</p>

            <h5 className="text-center mb-3">3.0    Salary exception</h5>
            <p>This feature ensures that an employee basic salary can be independent of the employee level. To add a basic salary exception, the amount and the employee name is needed which can be selected from the employee dropdown list.</p>
            <p>Previously entered basic salary exception can be viewed or deleted from the system.</p>

            <h6 className="mt-3">3.1     Other exceptions</h6>
            <p>Other exceptions can be added to an employee payroll, this exception is of two types and it can either be an income or a deduction.</p> <p>This exception is specific to an employee and depending on the type of exception, it will be added or deducted from the employee salary on a monthly basis.</p>
            <p>Also, other exceptions previously entered to the system can be viewd or deleted.</p>

            <h6 className="mt-3">3.2     One-Off exceptions</h6>
            <p>This feature gives the system a flexibilty of adding a one-off exception to an employee payroll. This can also be am income or a deduction, it is mandatory to select the month of payment. <strong>Note</strong> that this payment or deduction will be made only on the specified month and removed from the system after a year.</p>
            <p>In other to add a one-off payment, all fields are required. Previously entered one-off exceptions can be viewed or deleted from the system.</p>
            </div>

            <div className="col-md-12 card card-body card-success">
                <h5 className="text-center mb-3 mt-3">4.0     Dashboard</h5>
                <p>The dashboard gives an analytical view of the whole system, the aggregate of information currently in the database. The number of registered admin, active employees, deleted employees, levels and salary exceptions.</p>
                <p>There is a line chart which gives monthly analytics of payble net income and gross income, also is a doughnut chart which shows total net pay, consolidation relief allowance and employee bonuses payable by the employer within a calendar year. Piechart shows the total tax, pension and deductions payable by employee within a calendar year.</p>
                <p>There is also an overview of the last five registered employees on display with their basic information.</p>

                <h5 className="text-center mb-3 mt-3">5.0     Payroll</h5>
                <h6>Monthly report</h6>
                <p>This is the module responsible for the payroll calculations and generation, from the monthly report page an employee payslip can be generated by a single click of the <strong>view</strong> button. All emloyee payslip can also be generated by a single click of the <strong>generate</strong> button (available after 21 days of a month).</p>
                <p><strong>Note: </strong> Employee payroll can only be generated after 21 days of the present month. On the employee payslip page, a copy of the payslip can be downloaded in a portable document file(pdf), it can also be printed by a single button and lastly a pdf copy can be sent to employee email attached to the employee profile.</p>

                <h6 className="mt-3">All report</h6>
                <p>The all report page has in it first column three control buttons, payroll with pension, employee pension and employee tax. The payroll with pension displays in a table all employees and the payroll break down, the employee pension shows the pension contribution of all employees while the employee tax displays the tax payable by employees.</p>
                <p>The other two columns are links to which payroll records can be retrieved, records can be filtered by employee name, month and year. These records can also be exported in an excel format.</p>

                <h5 className="text-center mb-3 mt-3">6.0     Role privileges</h5>
                <h6>Super Administrator</h6>
                <p>This user has full access, the ability to create, edit and delete records from this system.</p>
                <h6>Administrator</h6>
                <p>Newly registered accounts on this platform are assigned the role of administrator by default and so they can't delete or create employee exceptions.</p>

            </div>
           </div>
            </section>
        </div>
        <Footer />
      </div>
    </div>
  )
