const express = require('express');
const bodyParser = require('body-parser');
const invoicesRouter = require('./routers/invoices');
const profileRouter = require('./routers/profile');
const withdrawRouter = require('./routers/withdraw');
const bankAccountRouter = require('./routers/bank-accounts');;

const app = express();

app.use(bodyParser.json());
app.use(invoicesRouter);
app.use(profileRouter);
app.use(withdrawRouter);
app.use(bankAccountRouter);

module.exports = app;
