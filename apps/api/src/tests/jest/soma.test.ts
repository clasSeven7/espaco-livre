import { soma } from '../../utils/soma';

describe('Função soma', () => {
  it('deve somar 2 + 3 e retornar 5', () => {
    expect(soma(2, 3)).toBe(5);
  });

  it('deve somar números negativos', () => {
    expect(soma(-4, -6)).toBe(-10);
  });
});
