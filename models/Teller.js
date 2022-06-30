const mongoose = require('mongoose')

const tellerSchema = new mongoose.Schema({
    badge_no: {
        type: String,
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwd: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Teller', tellerSchema)