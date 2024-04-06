const request = require('supertest');
const app = require('../../app');

describe('Invoices API', () => {
  it('should retrieve a valid response format', async () => {
    const response = await request(app)
      .get('/invoices/v2?search_value=&invoice_type=all&invoice_status=&sort=id&order=desc&limit=100&offset')
      .expect(200);

    expect(response.body).toHaveProperty('total_records');
    expect(response.body).toHaveProperty('has_more');
    expect(response.body).toHaveProperty('data');

    expect(typeof response.body.total_records).toBe('number');
    expect(typeof response.body.has_more).toBe('boolean');
    expect(Array.isArray(response.body.data)).toBeTruthy();

    response.body.data.forEach(invoice => {
      expect(invoice).toHaveProperty('id');
      expect(invoice).toHaveProperty('invoiced_amount');
      expect(invoice).toHaveProperty('invoiced_currency');
      expect(invoice).toHaveProperty('invoiced_currency_symbol');
      expect(invoice).toHaveProperty('sent_on');
      expect(invoice).toHaveProperty('invoice_status');
      expect(invoice).toHaveProperty('invoice_status_display_name');
      expect(invoice).toHaveProperty('invoice_type');
      expect(invoice).toHaveProperty('invoice_type_display_name');
      expect(invoice).toHaveProperty('payor_id');
      expect(invoice).toHaveProperty('payor_name');
      expect(invoice).toHaveProperty('payout_id');
      expect(invoice).toHaveProperty('payout_amount');
      expect(invoice).toHaveProperty('payout_currency');
      expect(invoice).toHaveProperty('payout_currency_symbol');

      expect(typeof invoice.id).toBe('number');
      expect(typeof invoice.invoiced_amount).toBe('string');
      expect(typeof invoice.invoiced_currency).toBe('string');
      expect(typeof invoice.invoiced_currency_symbol).toBe('string');
      expect(typeof invoice.sent_on).toBe('string');
      expect(typeof invoice.invoice_status).toBe('string');
      expect(typeof invoice.invoice_status_display_name).toBe('string');
      expect(typeof invoice.invoice_type).toBe('string');
      expect(typeof invoice.invoice_type_display_name).toBe('string');
      expect(typeof invoice.payor_id).toBe('number');
      expect(typeof invoice.payor_name).toBe('string');
      expect(invoice.payout_id === null || typeof invoice.payout_id === 'number').toBeTruthy();
      expect(invoice.payout_amount === null || typeof invoice.payout_amount === 'string').toBeTruthy();
      expect(invoice.payout_currency === null || typeof invoice.payout_currency === 'string').toBeTruthy();
      expect(invoice.payout_currency_symbol === null || typeof invoice.payout_currency_symbol === 'string').toBeTruthy();
    });
  });

  it('should handle filter sorting correctly', async () => {
    const filters = [
      { search_value: '', invoice_type: 'all', invoice_status: '' },
      { search_value: 'test', invoice_type: 'commission', invoice_status: 'payout_requested' },
      { search_value: 'test', invoice_type: 'recurring_invoice', invoice_status: 'declined' },
    ];

    for (const filter of filters) {
      const queryString = new URLSearchParams(filter).toString();
      const response = await request(app)
        .get(`/invoices/v2?${queryString}`)
        .expect(200);

      expect(response.body).toHaveProperty('total_records');
      expect(response.body).toHaveProperty('has_more');
      expect(response.body).toHaveProperty('data');

      expect(Array.isArray(response.body.data)).toBeTruthy();

      response.body.data.forEach(invoice => {
        if (filter.search_value) {
          expect(invoice.payor_name).toContain(filter.search_value);
        }
        if (filter.invoice_type !== 'all') {
          expect(invoice.invoice_type).toBe(filter.invoice_type);
        }
        if (filter.invoice_status) {
          expect(invoice.invoice_status).toBe(filter.invoice_status);
        }
      });
    }
  });

  it('should handle sorting correctly', async () => {
    let response = await request(app)
      .get('/invoices/v2?search_value=&invoice_type=all&invoice_status=&sort=id&order=asc&limit=100&offset')
      .expect(200);

    let ids = response.body.data.map(invoice => invoice.id);
    for (let i = 0; i < ids.length - 1; i++) {
      expect(ids[i]).toBeLessThanOrEqual(ids[i + 1]);
    }

    response = await request(app)
      .get('/invoices/v2?search_value=&invoice_type=all&invoice_status=&sort=id&order=desc&limit=100&offset')
      .expect(200);

    ids = response.body.data.map(invoice => invoice.id);
    for (let i = 0; i < ids.length - 1; i++) {
      expect(ids[i]).toBeGreaterThanOrEqual(ids[i + 1]);
    }
  });

  it('should handle pagination correctly', async () => {
    const response = await request(app)
      .get('/invoices/v2?search_value=&invoice_type=all&invoice_status=&sort=id&order=desc&limit=4&offset=1')
      .expect(200);

    expect(response.body.data.length).toBe(4);
    expect(response.body.has_more).toBeTruthy();
  });
});
