const request = require('supertest');
const app = require('../../app');

describe('Profile and Wallet API', () => {
  it('should retrieve profile and wallet information', async () => {
    const response = await request(app)
      .get('/profile/v2/wallet')
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('kyc_status');
    expect(response.body).toHaveProperty('kyb_status');
    expect(response.body).toHaveProperty('preferred_currency');
    expect(response.body).toHaveProperty('special_activities');
    expect(response.body).toHaveProperty('wallet_balances');
    expect(response.body.wallet_balances).toHaveProperty('USD');
    expect(response.body.wallet_balances).toHaveProperty('EUR');
    expect(response.body.wallet_balances).toHaveProperty('CAD');

    expect(typeof response.body.id).toBe('number');
    expect(typeof response.body.kyc_status).toBe('string');
    expect(typeof response.body.kyb_status).toBe('string');
    expect(typeof response.body.preferred_currency).toBe('string');
    expect(Array.isArray(response.body.special_activities)).toBeTruthy();
    expect(typeof response.body.wallet_balances.USD).toBe('number');
    expect(typeof response.body.wallet_balances.EUR).toBe('number');
    expect(typeof response.body.wallet_balances.CAD).toBe('number');
  });
});
