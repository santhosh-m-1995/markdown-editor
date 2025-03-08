import { Request, Response, NextFunction, RequestHandler } from 'express';

const reqHandleMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url, headers, body } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    console.log("Headers:", headers);
    if (Object.keys(body).length) console.log("Body:", body);
    next();
};

export default reqHandleMiddleware;