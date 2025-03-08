import { render, screen } from '@testing-library/react';
import App from "./App";

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


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Markdown HTML Preview/i);
  expect(linkElement).toBeInTheDocument();
});
