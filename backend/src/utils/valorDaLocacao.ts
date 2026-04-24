export function valorDaLocacao(tempo: number, valorPorHora: number): number {
  if (
    typeof tempo !== 'number' ||
    typeof valorPorHora !== 'number' ||
    isNaN(tempo) ||
    isNaN(valorPorHora)
  ) {
    throw new Error(
      'Parâmetros inválidos: ambos os valores devem ser números válidos.'
    );
  }

  const taxaLimpeza = 40;
  const valorTotal = tempo * valorPorHora + taxaLimpeza;
  return valorTotal;
}
