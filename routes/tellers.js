const express = require('express')
const router = express.Router()
const verifyAjwt = require('../middleware/verifyAjwt')
const Teller = require('../models/Teller')

router.get('/', verifyAjwt, (req, res) => {
    Teller.find().select('badge_no first_name last_name email -_id')
        .then(tellers => {
            console.log('okay: authorized')
            if(tellers.length == 0) {
                res.send('no_tellers')
            } else {
                res.json(tellers)
            }
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:badge_no', verifyAjwt, (req, res) => {
    badge_no = req.params.badge_no
    Teller.find({ badge_no:badge_no }).select('first_name last_name email -_id')
        .then(teller => {
            if(teller.length == 0) {
                res.send('invalid_badge')
            } else {
                res.send(teller[0])
            }
        })
        .catch(err => {
            res.send(err)
        })
})

const generate_badge = (res) => {
    // Generate a unique badge number for the new teller we are creating
    badge_no = ""
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(let i = 0; i < 2; i++) {
        badge_no += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    rand = Math.floor(Math.random() * 8999) + 1111
    badge_no += rand
    Teller.find({ badge_no:badge_no })
        .then(t => {
            if(t.length == 0) {
                return badge_no
            } else {
                generate_badge(res)
            }
        })
        .catch(err => {
            res.send(err)
        })
    return badge_no
}

router.post('/', verifyAjwt, (req, res) => {
    badge_no = generate_badge(res) // guaranteed to be unique in this case
    fname = req.body.fname
    lname = req.body.lname
    email = req.body.email
    let dt = new Date()
    passwd = fname + '.' + lname + '#' + dt.getFullYear()
    Teller.find({ email:email })
        .then(t => {
            if(t.length == 0) {
                // email unique as well, so we can add the new teller
                const teller = new Teller({
                    badge_no: badge_no,
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    passwd: passwd
                })
                teller.save()
                    .then(t => {
                        res.send('success')
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

module.exports = router