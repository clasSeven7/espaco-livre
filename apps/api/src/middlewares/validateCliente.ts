import { NextFunction, Request, Response } from 'express';

export async function validateCliente(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const clienteData = request.body as any;

  if (!clienteData.email || !clienteData.senha || !clienteData.nome_usuario) {
    return response.status(400).json({
      error: '❌ Campos obrigatórios não preenchidos',
      field: !clienteData.email
        ? 'email'
        : !clienteData.senha
        ? 'senha'
        : 'nome_usuario',
    });
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clienteData.email)) {
    return response.status(400).json({
      error: '📧 Email inválido',
      field: 'email',
    });
  }

  // Validação de senha
  if (clienteData.senha.length < 6) {
    return response.status(400).json({
      error: '🔒 A senha deve ter no mínimo 6 caracteres',
      field: 'senha',
    });
  }

  // Validação de idade baseada na data de nascimento
  if (!clienteData.data_de_nascimento) {
    return response.status(400).json({
      error: '⚠️ Data de nascimento é obrigatória',
      field: 'data_de_nascimento',
    });
  }

  const nascimento = new Date(clienteData.data_de_nascimento);
  const idade = new Date().getFullYear() - nascimento.getFullYear();
  const mes = new Date().getMonth() - nascimento.getMonth();

  // Verifica se o cliente tem 18 anos ou mais
  if (idade < 18 || (idade === 18 && mes < 0)) {
    return response.status(400).json({
      error: '⚠️ É necessário ter 18 anos ou mais para se cadastrar',
      field: 'data_de_nascimento',
    });
  }

  // Formatação de dados
  if (clienteData.cep) {
    clienteData.cep = clienteData.cep.replace(/\D/g, '');
  }

  if (clienteData.telefone) {
    clienteData.telefone = clienteData.telefone.replace(/\D/g, '');
  }

  // Adiciona os dados formatados ao request
  request.body = clienteData;
  next();
}
