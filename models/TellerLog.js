const mongoose = require('mongoose')

const tellerLogSchema = new mongoose.Schema({
    dt: {
        type: String,
        required: true
    },
    tm: {
        type: String,
        required: true
    },
    badge_no: {
        type: String,
        required: true
    },
    event_desc: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('TellerLog', tellerLogSchema)
