import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: string | jwt.JwtPayload;
}

const authMiddleware: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ success: false, message: 'Access Denied. No token provided.' });
        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Use environment variables for security
        const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
        req.user = decoded; // Attach decoded user info to request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

export default authMiddleware;
