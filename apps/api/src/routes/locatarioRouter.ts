import { locatarioController } from '@/controllers/locatarioController';
import { validateLocatario } from '@/middlewares/validateLocatario';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Locatarios
 *   description: Rotas para gerenciar locatários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Locatario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome_usuario:
 *           type: string
 *           example: maria_souza
 *         senha:
 *           type: string
 *           example: $2b$10$abcdef...
 *         email:
 *           type: string
 *           format: email
 *           example: maria@example.com
 *         telefone:
 *           type: string
 *           example: "83912345678"
 *         idade:
 *           type: integer
 *           example: 25
 *         endereco:
 *           type: string
 *           example: Rua das Flores, 123
 *         cidade:
 *           type: string
 *           example: João Pessoa
 *         cpf:
 *           type: string
 *           example: "12345678901"
 *         cep:
 *           type: string
 *           example: "58000000"
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
 * /locatarios:
 *   post:
 *     summary: Criar um novo locatário
 *     tags: [Locatarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Locatario'
 *     responses:
 *       201:
 *         description: Locatário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Locatario'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', validateLocatario, locatarioController.criar);

/**
 * @swagger
 * /locatarios/{id}:
 *   get:
 *     summary: Buscar locatário por ID
 *     tags: [Locatarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do locatário
 *     responses:
 *       200:
 *         description: Locatário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Locatario'
 *       404:
 *         description: Locatário não encontrado
 */
router.get('/:id', locatarioController.buscarPorId);

/**
 * @swagger
 * /locatarios:
 *   get:
 *     summary: Listar todos os locatários
 *     tags: [Locatarios]
 *     responses:
 *       200:
 *         description: Lista de locatários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Locatario'
 */
router.get('/', locatarioController.listarTodos);

/**
 * @swagger
 * /locatarios/{id}:
 *   put:
 *     summary: Atualizar um locatário
 *     tags: [Locatarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do locatário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Locatario'
 *     responses:
 *       200:
 *         description: Locatário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Locatario'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Locatário não encontrado
 */
router.put('/:id', validateLocatario, locatarioController.atualizar);

/**
 * @swagger
 * /locatarios/{id}:
 *   delete:
 *     summary: Deletar um locatário
 *     tags: [Locatarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do locatário
 *     responses:
 *       200:
 *         description: Locatário deletado com sucesso
 *       404:
 *         description: Locatário não encontrado
 */
router.delete('/:id', locatarioController.deletar);

export default router;
