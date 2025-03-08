import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// import authMiddleware from './middleware/AuthMiddleware';
import reqHandleMiddleware from './middleware/RequestHandleMiddleware';
import errorCatcherMiddleware from './middleware/ErrorCatcherMiddleware';

import { setupSwagger } from "../config/swaggerConfig";
import TransformRoute from './routes/TransformRoute';
import SampleMDRoute from './routes/SampleMDRoute';

const cors = require('cors');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Build-in middlewares
app.use(cors());
app.use(express.json());

// Custom Middlwares
app.use(reqHandleMiddleware);
// app.use(authMiddleware);

const CONFIG = process.env;
let appConfig: { baseURL?: string } = {};
if (CONFIG.ENV) {
    appConfig = require(`../config/${CONFIG.ENV}.json`);
}

// Sample Route
app.get('/', (req: Request, res: Response) => {
    const response: { success: boolean; message: string; docUrl?: string } = { success: true, message: "Server working!" };
    if (CONFIG.ENV === "development" || CONFIG.SWAGGERENABLE) {
        response.docUrl = (appConfig?.baseURL) + "/api-docs";
    }
    res.json(response);
});

app.use("/api", TransformRoute);

app.use("/api/samples", SampleMDRoute);

if (CONFIG.ENV === "development" || CONFIG.SWAGGERENABLE) {
    console.log("Swagger");
    // Swagger documentation
    setupSwagger(app);
}

app.use(errorCatcherMiddleware);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});