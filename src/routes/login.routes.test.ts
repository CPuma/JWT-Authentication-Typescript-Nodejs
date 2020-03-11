import app from '../app';
import supertest from 'supertest';

// Refactorizando
const request = supertest(app);

describe('test endpoint Login', () => {
	// it === test

	it('Should tests that true === true', (done) => {
		expect(true).toBe(true);
		done();
	});

	// Callback DONE.. para finalizar el test
	test('it should repsonse the GET method', (done) => {
		request.get('/login').then((response) => {
			expect(response.status).toBe(202);
			done();
		});
	});

	// ASyncrono
	it('it should response the POST method', async () => {
		const res = await request.post('/login').send({
			email: 'puma.rasec@yahoo.es',
			password: '@123456'
		});
		expect(res.status).toEqual(201);
		expect(res.body).toHaveProperty('data');
		expect(res.body.data.message).toBe('Estas logueado');
	});
});
