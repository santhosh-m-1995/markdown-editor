import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Markdown Editor API Documentation',
        version: '1.0.0',
        description: 'API documentation for the Markdown Editor backend using Express.js and TypeScript',
        contact: {
            name: 'Developer Support',
            email: 'support@example.com',
        }
    },
    servers: [
        {
            url: 'http://localhost:5000/api',
            description: 'Development Server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing Swagger annotations
    apis: ['./src/routes/*.ts'], // Ensure this path matches your route files
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Configures Swagger documentation in the Express app
 * @param app Express application
 */
export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
