const express = require('express');
const invoicesRouter = require('./routers/invoices');
const profileRouter = require('./routers/profile');

const app = express();

app.use(invoicesRouter);
app.use(profileRouter);

module.exports = app;
