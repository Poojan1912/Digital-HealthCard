const express = require("express");
var router = express.Router();
const { getUserById, getAllUserForms, getUser, getUserByAadhar } = require("../controllers/user");
const { fillData, getHospitalById } = require("../controllers/hospital");
const {isSignedIn, isAuthenticated} = require("../controllers/auth")
const { check } = require('express-validator');

router.param("userId", getUserById);
router.param("hospitalId", getHospitalById);

router.get("/user/form/:userId", isSignedIn, isAuthenticated, getAllUserForms);

router.post("/user/aadhar",
[
    check('aadharNumber')
    .notEmpty()
    .withMessage("Aadhar Number is required.")
    .isLength({ min: 12, max: 12 })
    .withMessage('Aadhar Number must be 12 characters long.')
],
 getUserByAadhar);

module.exports = router;