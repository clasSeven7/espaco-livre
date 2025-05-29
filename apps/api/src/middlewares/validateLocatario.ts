import { NextFunction, Request, Response } from 'express';

export async function validateLocatario(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const locatarioData = request.body as any;

  if (
    !locatarioData.email ||
    !locatarioData.senha ||
    !locatarioData.nome_usuario ||
    !locatarioData.cpf
  ) {
    return response.status(400).json({
      error: '❌ Campos obrigatórios não preenchidos',
      field: !locatarioData.email
        ? 'email'
        : !locatarioData.senha
        ? 'senha'
        : !locatarioData.nome_usuario
        ? 'nome_usuario'
        : 'cpf',
    });
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(locatarioData.email)) {
    return response.status(400).json({
      error: '📧 Email inválido. Por favor, verifique o formato',
      field: 'email',
    });
  }

  // Validação de senha
  if (locatarioData.senha.length < 6) {
    return response.status(400).json({
      error: '🔒 A senha deve ter no mínimo 6 caracteres para maior segurança',
      field: 'senha',
    });
  }

  // Validação de idade baseada na data de nascimento
  if (!locatarioData.data_de_nascimento) {
    return response.status(400).json({
      error: '⚠️ Data de nascimento é obrigatória',
      field: 'data_de_nascimento',
    });
  }

  const nascimento = new Date(locatarioData.data_de_nascimento);
  const idade = new Date().getFullYear() - nascimento.getFullYear();
  const mes = new Date().getMonth() - nascimento.getMonth();

  // Verifica se o locatário tem 18 anos ou mais
  if (idade < 18 || (idade === 18 && mes < 0)) {
    return response.status(400).json({
      error: '⚠️ É necessário ter 18 anos ou mais para se cadastrar',
      field: 'data_de_nascimento',
    });
  }

  // Validação de CPF
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(locatarioData.cpf.replace(/\D/g, ''))) {
    return response.status(400).json({
      error: '📄 CPF inválido. Verifique o número informado',
      field: 'cpf',
    });
  }

  // Formatação de dados
  if (locatarioData.cep) {
    locatarioData.cep = locatarioData.cep.replace(/\D/g, '');
  }

  if (locatarioData.telefone) {
    locatarioData.telefone = locatarioData.telefone.replace(/\D/g, '');
  }

  if (locatarioData.cpf) {
    locatarioData.cpf = locatarioData.cpf.replace(/\D/g, '');
  }

  // Adiciona os dados formatados ao request
  request.body = locatarioData;
  next();
}
