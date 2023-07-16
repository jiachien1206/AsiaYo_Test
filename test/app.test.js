import { app } from '../app.js';
import request from 'supertest';
describe('GET /exchange', () => {
    test('Correct inputs', async () => {
        const response = await request(app)
            .get('/exchange')
            .query({ source: 'USD', target: 'JPY', amount: '$1,525' });
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('success');
        expect(response.body.amount).toBe('$170,496.53');
    });

    test('Return 400 if source currency is missing', async () => {
        const response = await request(app)
            .get('/exchange')
            .query({ target: 'JPY', amount: '$1,525' });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Invalid input.');
    });

    test('Return 400 if there are no query strings', async () => {
        const response = await request(app).get('/exchange');

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Invalid input.');
    });

    test('Returns 400 if amount is missing', async () => {
        const response = await request(app)
            .get('/exchange')
            .query({ source: 'USD', target: 'JPY' });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Invalid input.');
    });

    test('Returns 400 if amount is not in right format', async () => {
        const response = await request(app)
            .get('/exchange')
            .query({ source: 'USD', target: 'JPY', amount: '$1525' });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Invalid input.');
    });

    test('Returns 400 if source currency is not supported', async () => {
        const response = await request(app)
            .get('/exchange')
            .query({ source: 'EUR', target: 'JPY', amount: '$1,525' });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Currency not supported.');
    });

    test('Returns 400 if target currency is not supported', async () => {
        const response = await request(app)
            .get('/exchange')
            .query({ source: 'USD', target: 'KRW', amount: '$1,525' });

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Currency not supported.');
    });
});
