import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { CustomError } from '../utils/CustomInterface';

const ASSETS_DIR: string = path.join(__dirname, '../../assets/sample-markdown'); // Folder containing Markdown files

/**
 * Retrieves the list of Markdown files in the assets directory.
 */
export const sampleList = (req: Request, res: Response): void => {
    fs.readdir(ASSETS_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading directory', error: err });
        }

        // Filter only .md files and map their details
        const mdFiles: string[] = files
            .filter((file: string) => file.endsWith('.md'))
            .map((file: string) => file.replace(".md", ""));

        if (mdFiles.length) {
            res.json({ success: true, files: mdFiles });
        } else {
            res.status(404).json({ success: false, message: "No data found" });
        }
    });
};

/**
 * Reads the content of a specific Markdown file.
 */
export const readFileContent = (req: Request, res: Response, next: NextFunction): void => {
    const fileName: string = req.params.filename || "";
    if (!fileName) {
        const error: CustomError = new Error("Filename missing in the param");
        error.status = 400;
        return next(error);
    }

    try {
        const content: string = fs.readFileSync(`${ASSETS_DIR}/${fileName}.md`, "utf-8");
        res.json({ success: true, data: content });
    } catch (err) {
        const error: CustomError = new Error("Filename not found");
        error.status = 404;
        next(error);
    }
};
