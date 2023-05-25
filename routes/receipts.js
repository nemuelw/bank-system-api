const express = require('express')
const router = express.Router()
const Account = require('../models/Account')
const Transfer = require('../models/Transfer')
const verifyTjwt = require('../middleware/verifyTjwt')

router.get('/:acct_no', verifyTjwt, (req, res) => {
    acct_no = req.params.acct_no
    Account.find({ acct_no:acct_no })
        .then(acct => {
            if(acct.length == 0) {
                res.send('acct_not_found')
            } else {
                Transfer.find({ recipient:acct_no })
                    .then(r => {
                        if(r.length == 0) {
                            res.send('no_receipts')
                        } else {
                            res.send(r)
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

module.exports = router
