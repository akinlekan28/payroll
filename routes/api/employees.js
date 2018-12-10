const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const EmployeeInput = require("../../validation/employee");

//Load Employee model
const Employee = require("../../models/Employee");


module.exports = router;