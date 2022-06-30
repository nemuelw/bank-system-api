const express = require('express')
const router = express.Router()
const Account = require('../models/Account')
const Deposit = require('../models/Deposit')
const verifyTjwt = require('../middleware/verifyTjwt')

router.get('/', verifyTjwt, (req, res) => {
    Deposit.find()
        .then(deposits => {
            if(deposits.length == 0) {
                res.send('no_deposits')
            } else {
                res.json(deposits)
            }
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:acct_no', verifyTjwt, (req, res) => {
    acct_no = req.params.acct_no;
    Account.find({ acct_no:acct_no })
        .then(acct => {
            if(acct.length == 0) {
                res.send('acct_not_found')
            } else {
                Deposit.find({ acct_no:acct_no })
                    .then(d => {
                        if(d.length == 0) {
                            res.send('no_deposits')
                        } else {
                            res.json(d)
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
    acct_no = req.body.acct_no;
    deposit_amt = req.body.deposit_amt;
    Account.find({ acct_no:acct_no })
        .then(acct => {
            if(acct.length == 0) {
                // invalid account number
                res.send('acct_not_found')
            } else {
                // account exists ...
                current_bal = acct[0].acct_bal
                new_bal = current_bal + deposit_amt
                let dt = new Date()
                curr_dt = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
                curr_tm = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
                Account.findOneAndUpdate({ acct_no:acct_no }, { acct_bal:new_bal })
                    .then(acct => {
                        const deposit = new Deposit({
                            dt: curr_dt,
                            tm: curr_tm,
                            acct_no: acct_no,
                            deposit_amt: deposit_amt
                        })
                        deposit.save()
                            .then(d => {
                                res.send('success')
                            })
                            .catch(err => {
                                res.send(err)
                            })
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