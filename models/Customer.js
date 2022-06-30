const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    national_id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true, 
        unique: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)