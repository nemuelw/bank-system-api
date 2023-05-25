const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    acct_no: {
        type: Number,
        required: true,
        unique: true
    },
    national_id: {
        type: Number,
        required: true,
        unique: true
    },
    creation_dt: {
        type: String,
        required: true
    },
    acct_bal: {
        type: Number,
        required: true
    },
    acct_pin: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Account', accountSchema)
