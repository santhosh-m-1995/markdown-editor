# Markdown Editor (MERN Stack)

## Tech Stack
- **Node.js**: v20.18.1
- **React.js**: v19
- **Express.js**: v4.21.2
- **Swagger**: v5.0.1
- **Jest**: v29.7.0
- **TypeScript**: v5.8.2

---

## Project Structure
```
root
 ├── markdown-editor-frontend
 └── markdown-editor-backend
```

---

## Frontend Setup
### Application Name: **Markdown Editor (Frontend)**
- **PORT:** 3000
- **URL:** [http://localhost:3000](http://localhost:3000)

### `.env` Configuration
```
REACT_APP_API_BASE_URL = "http://localhost:5000/api"
REACT_APP_PORT=3000
```

### Test Command
```bash
npm run test
```

### Docker Commands
```bash
sudo docker build -t markdown-editor-frontend:1.0.0 .
sudo docker run -dp 3000:3000 markdown-editor-frontend:1.0.0
```

---

## Backend Setup
### Application Name: **Markdown Editor (Backend)**
- **PORT:** 5000
- **URL:** [http://localhost:5000](http://localhost:5000)

### `.env` Configuration
```
PORT=5000
ENV=development
SWAGGERENABLE=true
```

### Test Command
```bash
npm run test
```

### Docker Commands
```bash
sudo docker build -t markdown-editor-backend:1.0.0 .
sudo docker run -dp 5000:5000 markdown-editor-backend:1.0.0
```

### Swagger Documentation
- **Swagger URL:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## API Routes
| Route                   | Method | Description                          |
|------------------------|---------|--------------------------------------|
| `/api/convert`           | **POST**  | Converts markdown text into HTML      |
| `/api/samples/list`      | **GET**   | Retrieves the sample markdown file list|
| `/api/samples/:filename` | **GET**   | Reads and returns markdown file content|

---

## Running the Application
1. Clone the repository.
2. Navigate to the respective folder: `markdown-editor-frontend` or `markdown-editor-backend`.
3. Run `npm install` to install dependencies.
4. Create the `.env` file in each folder and configure environment variables.
5. Use Docker commands to build and run the application.

For any issues, refer to the Swagger documentation for detailed API reference. 🚀
