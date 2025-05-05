import {calcularTaxaServico} from '../../utils/calcularTaxaServico';

describe('Função calcularTaxaServico', () => {
  it('deve retornar a taxa de serviço correta', () => {
    expect(calcularTaxaServico()).toBe(40);
  });

  it('deve retornar um número', () => {
    expect(typeof calcularTaxaServico()).toBe('number');
  });
});