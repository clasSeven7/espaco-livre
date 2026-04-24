import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Espaço Livre',
      version: '1.0.0',
      description: 'Documentação da API do projeto Espaço Livre',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default function setupSwagger(app: Express) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
