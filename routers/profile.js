const express = require('express');
const wallet = require('../fixtures/profile.json');

const router = express.Router();

router.get('/profile/v2/wallet', (_, res) => {
  res.json(wallet);
});

module.exports = router;
