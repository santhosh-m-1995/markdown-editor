import express from 'express';
import { sampleList, readFileContent } from '../controllers/SamplesController';

const router = express.Router();

/**
 * @swagger
 * /samples/list:
 *   get:
 *     summary: Get sample filename list
 *     description: Retrieve a list of markdown filenames.
 *     responses:
 *       200:
 *         description: Successfully fetched the list of sample filenames.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["File1", "File2"]
 *       404:
 *         description: No data found
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
 *         description: Internal server error || Error reading directory
 */
router.get('/list', sampleList);

/**
 * @swagger
 * /samples/{filename}:
 *   get:
 *     summary: Get the markdown file content
 *     description: Retrieve a markdown file content.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Name of the markdown file
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the markdown file content.
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
 *       404:
 *         description: Filename not found
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
 *         description: Internal server error
 */
router.get(['/', '/:filename'], readFileContent);

export default router;
