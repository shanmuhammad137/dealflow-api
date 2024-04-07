const express = require('express');

const router = express.Router();

router.post('/invoices/v2/withdraw', (req, res) => {
  const payload = req.body;

  const response = {
    success: [],
    failure: []
  };

  payload.forEach(withdraw => {
    const { invoice_id, bank_account_id, currency } = withdraw;

    if (bank_account_id && currency) {
      response.success.push({ invoice_id });
    } else {
      response.failure.push({ invoice_id });
    }
  });

  res.status(200).json(response);
});

module.exports = router;
