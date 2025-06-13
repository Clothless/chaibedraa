# Personal Website

A fullstack personal website built with React, Go, and PostgreSQL.

## Tech Stack

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: Go with Chi router
- **Database**: PostgreSQL
- **Authentication**: Token-based auth for admin dashboard
- **Containerization**: Docker and Docker Compose

## Project Structure

```
.
├── frontend/          # React application
├── backend/          # Go API server
├── db/              # Database migrations
└── docker-compose.yml
```

## Development

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the values
3. Run `docker-compose up` to start the development environment
4. Access the frontend at `http://localhost:3000`
5. Access the backend API at `http://localhost:8080`

## Features

- Public website with projects and blog
- Admin dashboard for content management
- Markdown support for blog posts
- Responsive design with Tailwind CSS
- Docker-based development environment

## License

MIT 