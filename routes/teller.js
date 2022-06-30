const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const teller = require('../models/Teller')

router.post('/', (req, res) => {
    badge_no = req.body.badge_no;
    passwd = req.body.passwd;
    teller.find({badge_no: badge_no})
        .then(usr => {
            if(usr.length == 0) {
                res.send('invalid_creds')
            } else {
                if(passwd === usr[0].passwd) {
                    // creds are correct, respond with the jwt
                    res.json({ token: jwt.sign({ badge_no }, 'dT3ll3R@Sl0ngT0k3nth@TUk@ntGu3sSTry@nDci1') })
                } else {
                    res.send('invalid_creds')
                }
            }
        })
        .catch(err => {
            res.send('invalid_creds')
        })
})

module.exports = router