import jwt from 'jsonwebtoken';
import { alocadorRepository } from '../repositories/alocadorRepository';
import { clienteRepository } from '../repositories/clienteRepository';

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
        return { token, usuario: { ...cliente, tipo: 'cliente' } };
      }

      // Tenta encontrar o usuário como alocador
      const alocador = await alocadorRepository.buscarPorNomeUsuario(
        nome_usuario
      );
      if (alocador && alocador.senha === senha) {
        const token = jwt.sign(
          { id: alocador.id, tipo: 'alocador' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        return { token, usuario: { ...alocador, tipo: 'alocador' } };
      }

      throw {
        status: 401,
        message: 'Usuário ou senha inválidos',
      };
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: 'Erro ao realizar login',
      };
    }
  },
};
