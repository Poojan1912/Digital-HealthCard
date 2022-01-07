var express = require('express');
var router = express.Router();
const { signup, signin, signout, isSignedIn } = require("../controllers/auth");
const { check } = require('express-validator');

router.post("/hospital/signup",
    [
        check('email')
            .notEmpty()
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Please check your email'),
        check('password')
            .notEmpty()
            .withMessage("Password is required.")
            .isLength({ min: 5 })
            .withMessage('Password must be atleast 5 characters long.'),
        check('hospitalName')
            .notEmpty()
            .withMessage('Hospital Name is required.'),
        check('mobileNumber')
            .notEmpty()
            .withMessage('Phone Number is required.')
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone Number must be 10 characters long.'),
        check('registrationNumber')
            .notEmpty()
            .withMessage('Registration Number is required.')
            .isLength({ min: 12, max: 12 })
            .withMessage('Registration Number must be 12 characters long.'),
        check('address')
            .notEmpty()
            .withMessage('Address is required.'),
    ]
    , signup);

router.post("/user/signup",
    [
        check('email')
            .isEmail()
            .withMessage('Please check your email'),
        check('password')
            .notEmpty()
            .withMessage("Password is required.")
            .isLength({ min: 5 })
            .withMessage('Password must be atleast 5 characters long.'),
        check('aadharNumber')
            .notEmpty()
            .withMessage("Aadhar Number is required.")
            .isLength({ min: 12, max: 12 })
            .withMessage('Aadhar Number must be 12 characters long.'),
        check('firstName')
            .notEmpty()
            .withMessage('First Name is required.'),
        check('dateOfBirth')
            .notEmpty()
            .withMessage('Date of Birth is required.'),
        check('mobileNumber')
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone Number must be 10 characters long.'),
    ], signup);

router.post("/signin",
    [
        check('email')
            .notEmpty()
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Please check your Email.'),
        check('password')
            .notEmpty()
            .withMessage('Password is required.')
            .isLength({ min: 5 })
            .withMessage('must be at least 5 chars long'),
    ], signin)

router.get("/signout", signout)

module.exports = router;