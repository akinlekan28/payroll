# 📜 Employee Payroll Management System Documentation

## 🔢 1.0 Level System

This software uses a level system to calculate employee salaries. Before adding an employee to the system, you must add a level.

**Important**: Enter the basic salary without commas.

From the employee level page, you can edit and delete previously entered level information. An employee level cannot be deleted once an employee has been registered under that level.

### 💰 1.1 Level Bonuses

From the employee level tabs, you can add level-wide bonuses to a specific level. These bonuses are added to the employee's salary monthly. All employees belonging to a level receive the bonuses attached to that level.

**Action**: From the bonus tab, you can delete previously entered bonuses.

### ➖ 1.2 Level Deductions

From the employee level tabs, you can add level-wide deductions to a specific level. These deductions are subtracted from the employee's salary monthly. All employees belonging to a level will have the deductions attached to that level subtracted from their salary.

**Action**: From the deduction(s) tab, you can delete previously entered deductions.

### ❌ 1.3 Fixed Deductions

This system generates payroll based on the PAYE tax system in Nigeria and calculates employee pension at a rate of 8% of the taxable income. You can add other company or state-based deductions through the level deduction option.

## 🧑‍💼 2.0 Employee Profile

After adding an employee level, you can create an employee profile. This requires the employee's full name, a valid email, designation, department, and the employee level. All fields are mandatory.

**Action**: From the view profiles page, you can edit or delete employee profiles.

## 💹 3.0 Salary Exception

This feature ensures an employee's basic salary can be independent of their level. To add a basic salary exception, select the employee's name from the dropdown list.

**Action**: You can view or delete previously entered basic salary exceptions.

### ➕➖ 3.1 Other Exceptions

You can add other exceptions to an employee's payroll. These can be either incomes or deductions and are specific to the employee. Depending on the type, it's added or deducted from the salary monthly.

**Action**: You can view or delete previously entered exceptions.

### 📅 3.2 One-Off Exceptions

This feature allows adding a one-off exception to an employee's payroll. These can also be incomes or deductions. Select the month of payment—this payment or deduction is made only in that month and removed after a year.

**Action**: You can view or delete previously entered one-off exceptions.

## 📊 4.0 Dashboard

The dashboard provides an analytical overview of the system, aggregating database information. It displays:

- Registered admins
- Active employees
- Deleted employees
- Levels
- Salary exceptions

Charts include:

- Monthly net and gross income line chart
- Total net pay, consolidation relief allowance, and employee bonuses doughnut chart
- Total tax, pension, and deductions pie chart

**Highlight**: Overview of the last five registered employees with basic information.

## 📑 5.0 Payroll

### 📅 Monthly Report

This module handles payroll calculations and generation. From the monthly report page, generate an employee payslip with one click. Generate all payslips after 21 days of a month.

**Note**: Employee payroll can only be generated after 21 days of the current month. On the payslip page:

- Download the payslip as a PDF
- Print the payslip
- Send a PDF copy to the employee's email

### 📈 All Report

The all report page has control buttons for:

- Payroll with pension
- Employee pension
- Employee tax

You can filter records by employee name, month, and year, and export them in Excel format.

## 👥 6.0 Role Privileges

### 🦸‍♂️ Super Administrator

This user has full access, including creating, editing, and deleting records.

### 👩‍💼 Administrator

New accounts are assigned the administrator role by default. They cannot delete or create employee exceptions.
