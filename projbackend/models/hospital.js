var mongoose = require("mongoose");
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

var hospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
        length: 100
    },
    address: {
        type: String,
        unique: true,
        required: true
    },
    registrationNumber: {
        type: Number,
        required: true
    },
    mobileNumber: Number,
    email: {
        type: String,
        unique: true,
        set: v => v.toLowerCase(),
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    },
    salt: String
})

hospitalSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encryptedPassword = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

hospitalSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encryptedPassword;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("Hospital", hospitalSchema);