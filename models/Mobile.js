const mongoose = require('mongoose')

const mobileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    acct_no: {
        type: Number,
        required: true,
        unique: true
    },
    passwd: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mobile', mobileSchema)
