const mongoose = require('mongoose')

const withdrawalSchema = new mongoose.Schema({
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
    withdrawal_amt: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Withdrawal', withdrawalSchema)