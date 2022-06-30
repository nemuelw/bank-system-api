const express = require('express')
const account = require('../models/Account')
const router = express.Router()
const verifyTjwt = require('../middleware/verifyTjwt')

router.post('/', verifyTjwt, (req, res) => {
    acct_no = req.body.acct_no
    national_id = req.body.national_id
    // Obtaining current date ...
    let dt = new Date()
    creation_dt = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    acct_bal = 0
    // Generating a random 4-digit number which will be the PIN for the account
    rand = Math.random()
    rand = Math.floor(rand * 8999)
    rand += 1111
    acct_pin = rand
    account.find({acct_no: acct_no})
        .then(acct => {
            if(acct.length == 0) {
                // the account number is unique as required ... 
                // now check to ascertain that the id number is unique as well
                account.find({ national_id:national_id })
                    .then(acct => {
                        if(acct.length == 0) {
                            // national_id is unique as well, awesome 
                            const acct = new account({
                                acct_no: acct_no,
                                national_id: national_id,
                                creation_dt: creation_dt,
                                acct_bal: acct_bal,
                                acct_pin: acct_pin
                            })
            
                            // some code can be added here to for instance 
                            // print the Details of the newly created account
            
                            acct.save()
                                .then(doc => {
                                    res.send('success')
                                })
                                .catch(err => {
                                    res.send(err)
                                })
                        } else {
                            res.send('id_exists')
                        }
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                // send the request again ; prompts caller to regenerate the acct_no
                res.send('try_again')
            }
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:acct_no',verifyTjwt , (req, res) => {
    acct_no = req.params.acct_no
    account.find({acct_no: acct_no}).select('-passwd -_id')
        .then(acct => {
            if(acct.length == 0) {
                res.send('acct_not_found')
            } else {
                // return account info
                res.json(acct[0])
            }
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router 