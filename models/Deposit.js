const mongoose = require('mongoose')

const depositSchema = new mongoose.Schema({
    dt: {
        type: String,
        required: true
    },
    tm: {
        type: String,
        required: true
    },
    acct_no: {
        type: Number,
        required: true
    },
    deposit_amt: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Deposit', depositSchema)
