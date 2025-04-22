import { clienteController } from '@/controllers/clienteController';
import { validateCliente } from '@/middlewares/validateCliente';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Rotas para gerenciar clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome_usuario:
 *           type: string
 *           example: joao_silva
 *         senha:
 *           type: string
 *           example: minhaSenhaSegura123
 *         email:
 *           type: string
 *           format: email
 *           example: joao@example.com
 *         telefone:
 *           type: string
 *           example: "83912345678"
 *         idade:
 *           type: integer
 *           example: 30
 *         endereco:
 *           type: string
 *           example: Avenida Brasil, 1000
 *         cidade:
 *           type: string
 *           example: João Pessoa
 *         cep:
 *           type: string
 *           example: "58000000"
 *         tipo_ocupacao:
 *           type: string
 *           example: Estudante
 *         frequencia_uso:
 *           type: string
 *           example: Semanal
 *         criado_em:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 *         atualizado_em:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Criar um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', validateCliente, clienteController.criar);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', clienteController.buscarPorId);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', clienteController.listarTodos);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualizar um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/:id', validateCliente, clienteController.atualizar);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deletar um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:id', clienteController.deletar);

export default router;
