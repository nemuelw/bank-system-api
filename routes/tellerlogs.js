const express = require('express')
const router = express.Router()
const TellerLog = require('../models/TellerLog')
const Teller = require('../models/Teller')
const verifyAjwt = require('../middleware/verifyAjwt')
const verifyTjwt = require('../middleware/verifyTjwt')

router.get('/', verifyAjwt, (req, res) => {
    TellerLog.find()
        .then(logs => {
            if(logs.length == 0) {
                res.send('no_logs')
            } else {
                res.json(logs)
            }
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:badge_no', verifyAjwt, (req, res) => {
    badge_no = req.params.badge_no;
    Teller.find({ badge_no:badge_no })
        .then(teller => {
            if(teller.length == 0) {
                // no teller by that badge number; invalid badge number
                res.send('invalid_badge')
            } else {
                // fetch logs for the badge number
                TellerLog.find({ badge_no:badge_no }).select('-badge_no')
                    .then(logs => {
                        if(logs.length == 0) {
                            res.send('no_logs')
                        } else {
                            res.json(logs)
                        }
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', verifyTjwt, (req, res) => {
    badge_no = req.body.badge_no;
    event_desc = req.body.event_desc;
    // event_desc = (event_desc == "login") ? "logged in" : "logged out";
    Teller.find({ badge_no:badge_no })
        .then(teller => {
            if(teller.length == 0) {
                res.send('invalid_badge')
            } else {
                // valid badge number
                let dt = new Date()
                event_dt = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
                event_tm = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
                const tellerLog = new TellerLog({
                    dt: event_dt,
                    tm: event_tm,
                    badge_no: badge_no,
                    event_desc: event_desc
                })
                tellerLog.save()
                    .then(log => {
                        res.send('logged')
                    })
                    .catch(err => {
                        // something prevented the event from being logged in the database
                        res.send(err)
                    })
            }
        })
        .catch(err => {
            res.send(err)
        }) 
})

module.exports = router
