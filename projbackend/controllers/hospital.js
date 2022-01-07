const HospitalForm = require("../models/hospitalForm");
const Hospital = require("../models/hospital");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.getUser = (req, res) => {
    id = req.body.userId;
    User.findById(id).exec((err, user) => {
        if(err){
            return res.status(400).json({
                error: "User not found."
            })
        }
        res.json(user);
    })
}

exports.getHospitalById = async (req, res, next, id) => {
    await Hospital.findById(id).exec((err, hospital) => {
        if (!hospital || err) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = hospital;
        // res.json(req.profile);
        next();
    })
}

exports.fillData = (req, res) => {
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    const hospitalForm = new HospitalForm(req.body);    
    hospitalForm.save((err, hospitalForm) => {
        if (err) {
            return res.status(400).json({
                error: "Could not submit form to Database."
            });
        }
        res.json({
            hospitalForm
        });
    });
}

exports.getAllUserFormsForHospital = async (req, res) => {    
    id = req.body.userId;    
    await HospitalForm.find({ user: id }).exec((err, form) => {
        if (err || !form) {
            return res.stauts(400).json({
                error: "Nothing to show"
            })
        }        
        res.json(form);
    })
}