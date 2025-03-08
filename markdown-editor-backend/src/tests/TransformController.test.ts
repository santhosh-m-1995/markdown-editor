import express from 'express';
import request from 'supertest';
import convertToHtml from '../controllers/TransformController';
import { CustomError } from '../utils/CustomInterface';

const app = express();
app.use(express.json());
app.post('/convert', convertToHtml);

describe('POST /convert - Markdown to HTML Conversion', () => {

    test('Should convert valid markdown to HTML successfully', async () => {
        const response = await request(app)
            .post('/convert')
            .send({ text: '# Heading\n**Bold Text**\n*Italic Text*' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.html).toContain("<h1>Heading</h1>");
        expect(response.body.html).toContain("<strong>Bold Text</strong>");
        expect(response.body.html).toContain("<em>Italic Text</em>");
    });

    test('Should return 400 if markdown text is empty', async () => {
        const response = await request(app)
            .post('/convert')
            .send({ text: "" });
        // console.log(response);
        expect(response.status).toBe(400);
        expect(response.text).toContain("Markdown text should not be empty");
    });

    test('Should handle malformed input gracefully', async () => {
        const response = await request(app)
            .post('/convert')
            .send({ text: "<script>alert('XSS')</script>" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            html: ""  // DOMPurify should sanitize the content and return empty HTML
        });
    });

    test('Should return 500 for unexpected errors', async () => {
        const mockConvertToHtml = jest.fn((req, res, next) => {
            const error: CustomError = new Error('Internal server error');
            error.status = 500;
            next(error);
        });

        app.post('/api/mock-error', mockConvertToHtml);
        const response = await request(app)
            .post('/api/mock-error')
            .send({ text: '# Sample Heading' });

        expect(response.status).toBe(500);
        expect(response.text).toContain('Internal server error');
    });
});
