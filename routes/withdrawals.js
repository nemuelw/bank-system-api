const express = require('express')
const router = express.Router()
const Account = require('../models/Account')
const Withdrawal = require('../models/Withdrawal')
const verifyTjwt = require('../middleware/verifyTjwt')

router.get('/', verifyTjwt, (req, res) => {
    Withdrawal.find()
        .then(w => {
            if(w.length == 0) {
                res.send('no_withdrawals')
            } else {
                res.json(w)
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
                Withdrawal.find({ acct_no:acct_no })
                    .then(w => {
                        if(w.length == 0) {
                            res.send('no_withdrawals')
                        } else {
                            res.json(w)
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
    withdrawal_amt = req.body.withdrawal_amt;
    Account.find({ acct_no:acct_no })
        .then(acct => {
            if(acct.length == 0) {
                res.send('acct_not_found')
            } else {
                if(withdrawal_amt >= acct[0].acct_bal) {
                    res.send('insufficient_funds')
                } else {
                    curr_bal = acct[0].acct_bal
                    new_bal = curr_bal - withdrawal_amt
                    let dt = new Date()
                    curr_dt = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
                    curr_tm = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
                    // update the account balance, and withdrawals collection
                    Account.findOneAndUpdate({ acct_no:acct_no }, { acct_bal:new_bal })
                        .then(acct => {
                            const withdrawal = new Withdrawal({
                                dt: curr_dt,
                                tm: curr_tm,
                                acct_no: acct_no,
                                withdrawal_amt: withdrawal_amt
                            }) 
                            withdrawal.save()
                                .then(w => {
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
            }
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router
