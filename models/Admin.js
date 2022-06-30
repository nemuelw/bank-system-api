const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    usrnm: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwd: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)