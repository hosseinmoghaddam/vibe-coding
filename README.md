# Vibe Coding Blog Platform

This is a sample test project for Vibe Coding, demonstrating a full-stack blog platform built with modern technologies.

## Technology Stack

### Backend
- Go (Golang)
- Gin Web Framework
- GORM (with SQLite)
- JWT Authentication
- RESTful API Design

### Frontend
- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Hot Toast for notifications

## Features

- User Authentication (Register/Login)
- Blog Post Management
  - Create new posts
  - View all posts
  - View single post
  - Edit own posts
  - Delete own posts
- Responsive Design
- Modern UI with Tailwind CSS
- JWT-based Authentication
- Error Handling & Loading States

## Project Structure

```
blog-project/
├── backend/               # Go backend server
│   ├── main.go           # Main server file
│   ├── go.mod            # Go modules
│   └── .env              # Environment variables
│
└── frontend/             # Next.js frontend
    ├── app/              # Next.js app directory
    │   ├── components/   # Reusable components
    │   ├── context/      # Auth context
    │   └── pages/        # Application pages
    └── public/           # Static files
```

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Start the server:
   ```bash
   go run main.go
   ```
The backend server will run on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
The frontend will be available at `http://localhost:3000`

## API Endpoints

### Public Endpoints
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post

### Protected Endpoints (Requires Authentication)
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Contributing

This is a test project for demonstration purposes. Feel free to use it as a reference or starting point for your own projects.
