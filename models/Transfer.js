const mongoose = require('mongoose')

const transferSchema = new mongoose.Schema({
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
    recipient: {
        type: Number,
        required: true
    },
    transfer_amt: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Transfer', transferSchema)