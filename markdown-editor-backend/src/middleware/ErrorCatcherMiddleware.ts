import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
}

const errorCatcherMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export default errorCatcherMiddleware;