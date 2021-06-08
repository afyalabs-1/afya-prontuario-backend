import { soma } from './teste';

describe('Teste para saber se o Jest está funcional.', () => {
    test('Soma entre dois números decimais', () => {
        expect(soma(1, 2)).toBe(3);
    }) ;
});

