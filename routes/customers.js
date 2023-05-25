const express = require('express')
const router = express.Router()
const axios = require('axios')
const Customer = require('../models/Customer')
const verifyTjwt = require('../middleware/verifyTjwt')

const URL = 'http://localhost:8000'

const init_account = (national_id, req, res0) => {
    rand = Math.random()
    rand = Math.floor(rand * 888888888889)
    rand += 111111111111
    acct_no = rand
    axios.post(`${URL}/accounts`, {
        acct_no: acct_no,
        national_id: national_id
    }, {
        headers: {
            'x-token': req.get('x-token')
        }
    })
    .then(res => {
        if(res.data === 'try_again') {
            // acct_no exists, therefore generate a new one
            init_account(national_id, req, res0)
        } else {
            res0.send(res.data)
        }
    })
    .catch(err => {
        res0.send(err)
    })
}

router.post('/', verifyTjwt, (req, res) => {
    national_id = req.body.national_id;
    fname = req.body.fname;
    lname = req.body.lname;
    mobile_no = req.body.mobile_no;
    // check whether the national_id already exists
    Customer.find({ national_id:national_id })
        .then(customer => {
            if(customer.length == 0) {
                // check whether the mobile Number already exists
                Customer.find({ mobile_no:mobile_no })
                    .then(customer => {
                        if(customer.length == 0) {
                            const customer = new Customer({
                                national_id: national_id,
                                first_name: fname,
                                last_name: lname,
                                mobile_no: mobile_no
                            })
                            // add customer to the database
                            customer.save()
                                .then(customer => {
                                    // update the accounts as well
                                    init_account(national_id, req, res);
                                })
                                .catch(err => {
                                    res.send('try_again')
                                })
                        } else {
                            res.send('mobile_exists')
                        }
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
    
})

module.exports = router
