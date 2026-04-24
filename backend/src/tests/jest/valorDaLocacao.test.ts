import { valorDaLocacao } from '../../utils/valorDaLocacao';

describe('Função valorDaLocacao', () => {
  it('deve calcular corretamente o valor total da locação', () => {
    expect(valorDaLocacao(3, 25)).toBe(115); // 3*25 + 40
  });

  it('deve considerar apenas a taxa de limpeza quando o tempo for 0', () => {
    expect(valorDaLocacao(0, 100)).toBe(40);
  });

  it('deve calcular corretamente com valor por hora decimal', () => {
    expect(valorDaLocacao(2, 37.5)).toBeCloseTo(115); // 2*37.5 + 40
  });

  it('deve calcular corretamente com tempo decimal', () => {
    expect(valorDaLocacao(1.5, 60)).toBeCloseTo(130); // 1.5*60 + 40
  });

  it('deve retornar valor negativo se tempo ou valorPorHora forem negativos (a menos que trate isso)', () => {
    expect(valorDaLocacao(-2, 50)).toBe(-60); // -2*50 + 40 = -100 + 40
    expect(valorDaLocacao(2, -50)).toBe(-60);
  });

  it('deve lançar erro se os argumentos forem inválidos (se for implementado)', () => {
    expect(() => valorDaLocacao('3' as any, 25)).toThrow();
    expect(() => valorDaLocacao(null as any, 25)).toThrow();
    expect(() => valorDaLocacao(undefined as any, 25)).toThrow();
  });
});
