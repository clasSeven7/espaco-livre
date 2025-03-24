import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { clienteRepository } from '../repositories/clienteRepository';

export const clienteController = {
  async criar(request: FastifyRequest, reply: FastifyReply) {
    try {
      const clienteData = request.body as any;

      // Verifica se já existe um cliente com o mesmo email
      const clienteExistente = await clienteRepository.buscarPorEmail(
        clienteData.email
      );
      if (clienteExistente) {
        return reply.status(400).send({ error: 'Email já cadastrado' });
      }

      // Criptografa a senha antes de salvar
      const senhaCriptografada = await bcrypt.hash(clienteData.senha, 10);

      const cliente = await clienteRepository.criar({
        ...clienteData,
        senha: senhaCriptografada,
      });

      // Remove a senha do objeto retornado
      const { senha, ...clienteSemSenha } = cliente;

      return reply.status(201).send(clienteSemSenha);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
  },
};
