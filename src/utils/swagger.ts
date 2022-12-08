import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import log from './logger';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'REST API Docs',
      version,
    },

    components: {
      securitySchemas: {
        bearerAuth: {
          name: 'Authorization',
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/route.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Express, port: number) => {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
};
