import { Request, Response, NextFunction } from 'express';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { CustomError } from '../utils/CustomInterface';



const convertToHtml = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const markdownText: string = req.body.text || "";
        if (!markdownText) {
            const error: CustomError = new Error("Markdown text should not be empty");
            error.status = 400;
            return next(error);
        }

        let htmlOutput: string = marked.parse(markdownText).toString();

        // Sanitize the HTML output to prevent XSS attacks
        htmlOutput = DOMPurify.sanitize(htmlOutput);
        res.json({ success: true, html: htmlOutput });
    } catch (error) {
        console.error("Error processing Markdown:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default convertToHtml;
