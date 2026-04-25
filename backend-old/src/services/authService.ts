import { clienteRepository } from '@/repositories/clienteRepository';
import { locatarioRepository } from '@/repositories/locatarioRepository';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta';

export const authService = {
  async login(nome_usuario: string, senha: string) {
    try {
      // Tenta encontrar o usuário como cliente
      const cliente = await clienteRepository.buscarPorNomeUsuario(
        nome_usuario
      );
      if (cliente && cliente.senha === senha) {
        const token = jwt.sign(
          { id: cliente.id, tipo: 'cliente' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        return {
          token,
          usuario: { ...cliente, tipo: 'cliente' },
          message: '✅ Login realizado com sucesso! Bem-vindo(a)!',
        };
      }

      // Tenta encontrar o usuário como locatario
      const locatario = await locatarioRepository.buscarPorNomeUsuario(
        nome_usuario
      );
      if (locatario && locatario.senha === senha) {
        const token = jwt.sign(
          { id: locatario.id, tipo: 'locatario' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        return {
          token,
          usuario: { ...locatario, tipo: 'locatario' },
          message: '✅ Login realizado com sucesso! Bem-vindo(a)!',
        };
      }

      throw {
        status: 401,
        message:
          '❌ Usuário ou senha inválidos. Por favor, verifique suas credenciais.',
      };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message:
          '⚠️ Ops! Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.',
      };
    }
  },
};
