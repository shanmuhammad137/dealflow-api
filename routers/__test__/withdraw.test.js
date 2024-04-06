const request = require('supertest');
const app = require('../../app');
const withdraws = require('../../fixtures/withdraws.json');

describe('Withdrawal API', () => {
  it('should process bulk withdrawals successfully', async () => {
    const response = await request(app)
      .post('/invoices/v2/withdraw')
      .send(withdraws)
      .expect(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('failure');

    expect(Array.isArray(response.body.success)).toBeTruthy();
    expect(Array.isArray(response.body.failure)).toBeTruthy();

    expect(response.body.success.length).toBe(3);
    expect(response.body.failure.length).toBe(2);
  });
});
