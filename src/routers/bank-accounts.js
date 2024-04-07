const express = require('express');

const router = express.Router();

router.post('/profile/v2/billing/bank-accounts', (req, res) => {
  const {
    country,
    account_holder_name,
    bank_name,
    account_number,
    currency,
    is_primary,
    swift_code,
    iban,
    bic,
    routing_number,
    sort_code,
    account_type,
    bank_account_status,
  } = req.body;

  if (!country || !account_holder_name || !bank_name ||
      !account_number || !currency || !swift_code ||
      !iban || !bic || !account_type || !bank_account_status) {
    return res.status(400).json({ error: 'Missing required params' });
  }

  const response = {
    account_number: account_number,
    bank_name: bank_name,
    currency: currency,
    country: country,
    bank_details: {
      account_holder_name: account_holder_name,
      swift_code: swift_code,
      iban: iban,
      routing_number: routing_number,
      sort_code: sort_code,
      account_type: account_type,
      bic: bic,
      is_primary: is_primary
    },
    bank_account_status: bank_account_status
  };

  res.status(200).json(response);
});

module.exports = router;
