const express = require('express');
const invoices = require('../fixtures/invoices.json');

const router = express.Router();

router.get('/invoices/v2', (req, res) => {
    let filteredInvoices = invoices;

    if (req.query.search_value) {
      const searchTerm = req.query.search_value.toLowerCase();
      filteredInvoices = filteredInvoices.filter(invoice => {
          return invoice.payor_name.toLowerCase().includes(searchTerm);
      });
    }

    if (req.query.invoice_type && req.query.invoice_type !== 'all') {
        filteredInvoices = filteredInvoices.filter(invoice => {
            return invoice.invoice_type === req.query.invoice_type;
        });
    }

    if (req.query.invoice_status) {
      filteredInvoices = filteredInvoices.filter(invoice => {
          return invoice.invoice_status === req.query.invoice_status;
      });
    }

    if (req.query.sort && req.query.order) {
        filteredInvoices.sort((a, b) => {
            if (req.query.order === 'asc') {
                return a[req.query.sort] - b[req.query.sort];
            } else {
                return b[req.query.sort] - a[req.query.sort];
            }
        });
    }

    if (req.query.limit && req.query.offset) {
        filteredInvoices = filteredInvoices.slice(
            parseInt(req.query.offset),
            parseInt(req.query.offset) + parseInt(req.query.limit)
        );
    }

    res.json({
        total_records: invoices.length,
        has_more: filteredInvoices.length < invoices.length,
        data: filteredInvoices
    });
});

module.exports = router;
