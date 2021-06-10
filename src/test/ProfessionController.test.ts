// import app from '../app';
// import request from 'supertest';

// describe('GET /professions', () => {
//     test('Buscando todos os os registros e verificando se retorna um registro ou mais.', async () => {
//         const result = await request(app).get("/");
//         expect(result.statusCode).toEqual(200);
//     });
// });

import { ProfessionService } from '../services/ProfessionsService';

const professionService = new ProfessionService;

describe('Professions', () => {
    test('Lista todas as profissões', async () => {
        var lista = await professionService.listAll("");
        console.log(lista);
    }) ;
});