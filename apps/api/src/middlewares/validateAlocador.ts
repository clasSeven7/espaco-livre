import { NextFunction, Request, Response } from 'express';

export async function validateAlocador(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const alocadorData = request.body as any;

  // Validações básicas
  if (
    !alocadorData.email ||
    !alocadorData.senha ||
    !alocadorData.nome_usuario ||
    !alocadorData.cpf
  ) {
    return response.status(400).json({
      error: '❌ Campos obrigatórios não preenchidos',
      field: !alocadorData.email
        ? 'email'
        : !alocadorData.senha
        ? 'senha'
        : !alocadorData.nome_usuario
        ? 'nome_usuario'
        : 'cpf',
    });
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(alocadorData.email)) {
    return response.status(400).json({
      error: '📧 Email inválido. Por favor, verifique o formato',
      field: 'email',
    });
  }

  // Validação de senha
  if (alocadorData.senha.length < 6) {
    return response.status(400).json({
      error: '🔒 A senha deve ter no mínimo 6 caracteres para maior segurança',
      field: 'senha',
    });
  }

  // Validação de idade
  if (!alocadorData.idade || alocadorData.idade < 18) {
    return response.status(400).json({
      error: '👤 É necessário ter 18 anos ou mais para se cadastrar',
      field: 'idade',
    });
  }

  // Validação de CPF
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(alocadorData.cpf.replace(/\D/g, ''))) {
    return response.status(400).json({
      error: '📄 CPF inválido. Verifique o número informado',
      field: 'cpf',
    });
  }

  // Formatação de dados
  if (alocadorData.cep) {
    alocadorData.cep = alocadorData.cep.replace(/\D/g, '');
  }

  if (alocadorData.telefone) {
    alocadorData.telefone = alocadorData.telefone.replace(/\D/g, '');
  }

  if (alocadorData.cpf) {
    alocadorData.cpf = alocadorData.cpf.replace(/\D/g, '');
  }

  // Adiciona os dados formatados ao request
  request.body = alocadorData;
  next();
}
