// Author : Nemuel Wainaina

const express = require('express')
const cors = require('cors')
const db = require('./database')

const app = express()
app.use(cors())
app.use(express.json())

const adminRouter = require('./routes/admin')
const tellerRouter = require('./routes/teller')
const tellerlogsRouter = require('./routes/tellerlogs')
const customerRouter = require('./routes/customer')
const tellersRouter = require('./routes/tellers')
const customersRouter = require('./routes/customers')
const accountsRouter = require('./routes/accounts')
const depositsRouter = require('./routes/deposits')
const transfersRouter = require('./routes/transfers')
const receiptsRouter = require('./routes/receipts')
const withdrawalsRouter = require('./routes/withdrawals')

app.use('/admin', adminRouter)
app.use('/teller', tellerRouter)
app.use('/tellerlogs', tellerlogsRouter)
app.use('/tellers', tellersRouter)
app.use('/customer', customerRouter)
app.use('/customers', customersRouter)
app.use('/accounts', accountsRouter)
app.use('/deposits', depositsRouter)
app.use('/transfers', transfersRouter)
app.use('/receipts', receiptsRouter)
app.use('/withdrawals', withdrawalsRouter)

app.listen(8000, () => {
    console.log('Server running ...')
})



