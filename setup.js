const db = require('./database')
const Admin = require('./models/Admin')

const admin = new Admin({
    usrnm: "admin",
    email: "admin@bank.com",
    passwd: "password123"
})

admin.save()
    .then(adm => {
        console.log('[+] Set-up was successful .')
    })
    .catch(err => {
        console.log(err)
    })