import express from 'express';
import convertToHtml from "../controllers/TransformController";

// import authMiddleware from '../middleware/AuthMiddleware';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

/**
 * @swagger
 * /convert:
 *   post:
 *     summary: Transform the markdown plain text into html
 *     description: Convert the markdown text into the html tags, table, graph, code, etc...
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "# Header1"
 *     responses:
 *       200:
 *         description: Successfully transform the markdown content into html.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: string
 *                   example: "string"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *        description: Internal server error
 */

// router.use(authMiddleware);
router.post('/convert', (req: Request, res: Response, next: NextFunction) => convertToHtml(req, res, next));

export default router;