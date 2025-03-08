import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Layout from "./../Layout/Layout.js";
import { fetchData, postData } from "../../services/ConnectBackEnd.js";

// Mock the fetchData function
jest.mock("../../services/ConnectBackEnd", () => ({
    fetchData: jest.fn(),
    // postData: postData
}));

// Suppress CanceledError logs
beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
        if (!message.includes("CanceledError")) {
            console.error(message); // Allow other errors
        }
    });
});

afterAll(() => {
    console.error.mockRestore();
});

describe("Layout Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders Layout with initial content", () => {
        render(<Layout />);

        const markdownElements = screen.getAllByText("# Hello, Markdown!");
        expect(markdownElements[0]).toBeInTheDocument(); // First occurrence (likely <textarea>)
    });

    test("handles reset functionality", () => {
        render(<Layout />);

        const resetButton = screen.getByRole("button", { name: /reset/i });

        fireEvent.click(resetButton);

        const markdownElements = screen.getAllByText("# Hello, Markdown!");
        expect(markdownElements[0]).toBeInTheDocument(); // First occurrence (likely <textarea>)
    });

    test("handles copy functionality", async () => {
        const mockWriteText = jest.fn();
        navigator.clipboard = { writeText: mockWriteText };

        render(<Layout />);

        const copyButton = screen.getByRole("button", { name: /copy/i });

        fireEvent.click(copyButton);

        await waitFor(() => expect(mockWriteText).toHaveBeenCalledWith("# Hello, Markdown!"));

        expect(screen.getByRole("button", { name: /copied!/i })).toBeInTheDocument();
    });

    test("fetches sample markdown files on mount", async () => {
        const mockFiles = ["Basic", "Registration"];
        fetchData.mockResolvedValueOnce({ success: true, files: mockFiles });

        render(<Layout />);

        await waitFor(() => {
            mockFiles.forEach((file) => {
                expect(screen.getByText(file[0])).toBeInTheDocument();
            });
        });
    });
});
