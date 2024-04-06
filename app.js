const express = require('express');
const invoicesRouter = require('./routers/invoices');

const app = express();

app.use(invoicesRouter);

module.exports = app;
