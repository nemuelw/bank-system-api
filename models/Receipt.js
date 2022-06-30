const mongoose = require('mongoose')

const receiptSchema = mongoose.Schema({
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
    sender: {
        type: Number,
        required: true
    },
    received_amt: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Receipt', receiptSchema)