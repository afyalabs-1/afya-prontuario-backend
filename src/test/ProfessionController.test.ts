import app from '../app';
import request from 'supertest';

describe('GET /', () => {
    test('Buscando todos os os registros e verificando se retorna um registro ou mais.', async () => {
        const result = await request(app).get("/");
        expect(result.statusCode).toEqual(200);
    });
});