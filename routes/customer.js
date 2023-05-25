const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Account = require('../models/Account')
const Mobile = require('../models/Mobile')

// route to create new account on mobile app
router.post('/r', (req, res) => {
    email = req.body.email;
    acct_no = req.body.acct_no;
    passwd = req.body.passwd;
    // check whether email address already exists
    Mobile.find({ email:email })
        .then(acct => {
            if(acct.length == 0) {
                // check whether the account number is registered on mobile
                Mobile.find({ acct_no:acct_no })
                    .then(acct => {
                        if(acct.length == 0) {
                            Account.find({ acct_no:acct_no })
                                .then(acct => {
                                    if(acct.length == 0) {
                                        // invalid acct_no, no such acct
                                        res.send('acct_not_found')
                                    } else {
                                        // acct_no is valid
                                        const mobile = new Mobile({
                                            email: email,
                                            acct_no: acct_no,
                                            passwd: passwd
                                        })
                                        mobile.save()
                                            .then(acct => {
                                                res.send('success')
                                            })
                                            .catch(err => {
                                                res.send(err)
                                            })
                                    }
                                })
                        } else {
                            res.send('acct_taken')
                        }
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                res.send('email_exists')
            }
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/l', (req, res) => {
    email = req.body.email;
    passwd = req.body.passwd;
    Mobile.find({ email:email })
        .then(acct => {
            if(acct.length == 0) {
                // empty, no customer yet :(, only registration is possible
                res.send('invalid_creds')
            } else {
                if(passwd === acct[0].passwd) {
                    // creds are correct, respond with the jwt
                    res.json({ token: jwt.sign({ email }, 'KcUsT0m@Sl0ngT0k3nth@TUk@ntGu3sSTry@nDci1') })
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
