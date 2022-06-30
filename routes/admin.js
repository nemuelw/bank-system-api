const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const admin = require('../models/Admin')

router.post('/', (req, res) => {
    usrnm = req.body.usrnm;
    passwd = req.body.passwd;
    admin.find({usrnm: usrnm})
        .then(usr => {
            if(usr.length == 0) {
                // just precautionary measure, in case the data gets deleted some way, security, remember ?
                res.send('no_admin')
            } else {
                if(passwd === usr[0].passwd) {
                    // creds are correct, respond with the jwt
                    res.json({ token: jwt.sign({ usrnm }, '@AdmInC@Sl0ngT0k3nth@TUk@ntGu3sSTry@nDci1') })
                } else {
                    res.send('invalid_creds')
                }
            }
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router