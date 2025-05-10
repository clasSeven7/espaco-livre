import { NextFunction, Request, Response } from 'express';

export async function validateEspaco(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const espacoData = request.body as any;

  if (
    !espacoData.titulo ||
    !espacoData.descricao ||
    !espacoData.cidade ||
    !espacoData.valor_imovel ||
    !espacoData.locatario_id
  ) {
    return response.status(400).json({
      error: '❌ Campos obrigatórios não preenchidos',
      field: !espacoData.titulo
        ? 'titulo'
        : !espacoData.descricao
        ? 'descricao'
        : !espacoData.cidade
        ? 'cidade'
        : !espacoData.valor_imovel
        ? 'valor_imovel'
        : 'locatario_id',
    });
  }

  // Validação de valor do imóvel
  if (isNaN(espacoData.valor_imovel) || espacoData.valor_imovel <= 0) {
    return response.status(400).json({
      error: '💰 Valor do imóvel inválido. Deve ser um número positivo.',
      field: 'valor_imovel',
    });
  }

  // Formatação de dados
  if (espacoData.cep) {
    espacoData.cep = espacoData.cep.replace(/\D/g, '');
  }

  next();
}
