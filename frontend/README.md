# Frontend for chaibedraa.dev

This is the frontend application for chaibedraa.dev, built with React, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup

1. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000.

## Features

- Authentication system with JWT
- Dashboard for managing:
  - Projects
  - Blog posts
  - Contact messages
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── contexts/       # React contexts (e.g., AuthContext)
  ├── pages/         # Page components
  │   └── dashboard/ # Dashboard-related pages
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

## Development

- The application uses TypeScript for type safety
- Tailwind CSS is used for styling
- React Router is used for routing
- Axios is used for API requests

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Environment Variables

The following environment variables are used:

- `REACT_APP_API_URL`: Backend API URL (defaults to http://localhost:8080) 