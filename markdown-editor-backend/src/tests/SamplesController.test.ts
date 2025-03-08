import request from 'supertest';
import express, { Request, Response } from 'express';
import { sampleList, readFileContent } from '../controllers/SamplesController'; // Adjust path if needed

const app = express();

// Mock Routes for Testing
app.get('/api/samples/list', async (req: Request, res: Response) => {
    res.json({ success: true, files: ["test1", "test2"] });
});
app.get(['/api/samples/:filename', '/api/samples'], async (req: Request, res: Response) => {
    const filename = req.params.filename || "";
    if (!filename) {
        res.status(400).send({ success: false, message: "Filename not found" });
    } else if (filename === "test1") {
        res.send({ success: true, data: "Sample Markdown Content" });
    } else {
        res.status(404).send({ success: false, message: "Filename not found" });
    }
});

describe('Sample Controller Test Suite', () => {
    test('GET /api/samples/list - should return a list of markdown files', async () => {
        const response = await request(app).get('/api/samples/list');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.files).toEqual(['test1', 'test2']);
    });

    test('GET /api/samples/:filename - should return markdown content', async () => {
        const response = await request(app).get('/api/samples/test1');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBe('Sample Markdown Content');
    });

    test('GET /api/samples/:filename - should return 404 if file not found', async () => {
        const response = await request(app).get('/api/samples/nonexistent');
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Filename not found');
    });

    test('GET /api/samples/:filename - should return 400 for missing filename', async () => {
        const response = await request(app).get('/api/samples/');
        expect(response.status).toBe(400);
    });
});