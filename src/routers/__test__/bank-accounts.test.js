const request = require('supertest');
const app = require('../../app');
const bankAccount = require('../../fixtures/bank-account.json');

describe('Bank Account Creation API', () => {
  it('should create a bank account successfully', async () => {
    const response = await request(app)
      .post('/profile/v2/billing/bank-accounts')
      .send(bankAccount)
      .expect(200);

    [
      'account_number',
      'bank_name',
      'currency',
      'country',
      'bank_account_status',
    ].forEach((key) => expect(response.body).toHaveProperty(key, bankAccount[key]));

    [
      'account_holder_name',
      'swift_code',
      'iban',
      'routing_number',
      'sort_code',
      'account_type',
      'bic',
      'is_primary',
    ].forEach((key) => expect(response.body.bank_details).toHaveProperty(key, bankAccount[key]));
  });

  it('should return error for missing params', async () => {
    const invalidBankAccount = structuredClone(bankAccount);
    delete invalidBankAccount.account_number;

    const response = await request(app)
      .post('/profile/v2/billing/bank-accounts')
      .send(invalidBankAccount)
      .expect(400);

    expect(response.body).toHaveProperty('error', 'Missing required params');
  });
});
