import { NextFunction, Request, Response } from 'express';

export async function validateCliente(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const clienteData = request.body as any;

  // Validações básicas
  if (!clienteData.email || !clienteData.senha || !clienteData.nome_usuario) {
    return response.status(400).json({
      error: 'Campos obrigatórios não preenchidos',
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
      error: 'Email inválido',
      field: 'email',
    });
  }

  // Validação de senha
  if (clienteData.senha.length < 6) {
    return response.status(400).json({
      error: 'A senha deve ter no mínimo 6 caracteres',
      field: 'senha',
    });
  }

  // Validação de idade
  if (!clienteData.idade || clienteData.idade < 18) {
    return response.status(400).json({
      error: 'É necessário ter 18 anos ou mais para se cadastrar',
      field: 'idade',
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
