const express = require('express')
const verifyCjwt = require('../middleware/verifyCjwt')
const verifyTjwt = require('../middleware/verifyTjwt')
const verifyAjwt = require('../middleware/verifyAjwt')
const router = express.Router()
const Account = require('../models/Account')
const Transfer = require('../models/Transfer')

router.get('/', verifyAjwt, (req, res) => {
    Transfer.find()
        .then(transfers => {
            if(transfers.length == 0) {
                res.send('no_transfers')
            } else {
                res.json(transfers)
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
                Transfer.find({ sender:acct_no })
                    .then(t => {
                        if(t.length == 0) {
                            res.send('no_transfers')
                        } else {
                            res.json(t)
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
    sender = req.body.sender;
    recipient = req.body.recipient;
    transfer_amt = req.body.transfer_amt;
    Account.find({ acct_no:sender })
        .then(acct0 => {
            if(acct0.length == 0) {
                res.send('sender_not_found')
            } else {
                Account.find({ acct_no:recipient })
                    .then(acct1 => {
                        if(acct1.length == 0) {
                            res.send('recipient_not_found')
                        } else {
                            // now check if there's enough money to transfer 
                            sender_bal = acct0[0].acct_bal
                            if(transfer_amt >= sender_bal) {
                                res.send('insufficient_acct_bal')
                            } else {
                                recipient_bal = acct1[0].acct_bal
                                sender_bal -= transfer_amt
                                recipient_bal += transfer_amt
                                let dt = new Date()
                                curr_dt = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
                                curr_tm = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()

                                Account.findOneAndUpdate({ acct_no:sender }, { acct_bal:sender_bal })
                                    .then(s => {
                                        Account.findOneAndUpdate({ acct_no:recipient }, { acct_bal:recipient_bal })
                                            .then(r => {
                                                transfer = new Transfer({
                                                    dt: curr_dt,
                                                    tm: curr_tm,
                                                    acct_no: sender,
                                                    recipient: recipient,
                                                    transfer_amt: transfer_amt
                                                })
                                                transfer.save()
                                                    .then(t => {
                                                        res.json({ msg: 'success', acct_bal: sender_bal })
                                                    })
                                                    .catch(err => {
                                                        res.send(err)
                                                    })
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
            }
        })
        .catch(err => {
            res.send(err)
        })
})

// on mobile
router.post('/m', verifyCjwt, (req, res) => {
    sender = req.body.sender;
    recipient = req.body.recipient;
    transfer_amt = req.body.transfer_amt;
    Account.find({ acct_no:sender })
        .then(acct0 => {
            if(acct0.length == 0) {
                res.send('sender_not_found')
            } else {
                Account.find({ acct_no:recipient })
                    .then(acct1 => {
                        if(acct1.length == 0) {
                            res.send('recipient_not_found')
                        } else {
                            // now check if there's enough money to transfer 
                            sender_bal = acct0[0].acct_bal
                            if(transfer_amt >= sender_bal) {
                                res.send('insufficient_acct_bal')
                            } else {
                                recipient_bal = acct1[0].acct_bal
                                sender_bal -= transfer_amt
                                recipient_bal += transfer_amt
                                let dt = new Date()
                                curr_dt = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
                                curr_tm = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()

                                Account.findOneAndUpdate({ acct_no:sender }, { acct_bal:sender_bal })
                                    .then(s => {
                                        Account.findOneAndUpdate({ acct_no:recipient }, { acct_bal:recipient_bal })
                                            .then(r => {
                                                transfer = new Transfer({
                                                    dt: curr_dt,
                                                    tm: curr_tm,
                                                    acct_no: sender,
                                                    recipient: recipient,
                                                    transfer_amt: transfer_amt
                                                })
                                                transfer.save()
                                                    .then(t => {
                                                        res.json({ msg: 'success', acct_bal: sender_bal })
                                                    })
                                                    .catch(err => {
                                                        res.send(err)
                                                    })
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
            }
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router