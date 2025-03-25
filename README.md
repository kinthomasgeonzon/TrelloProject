
# PRD Project

A full-stack task management application built with Next.js and NestJS.

## Project Structure

```
PRDProject/
├── frontend/         # Next.js frontend application
└── backend/          # NestJS backend application
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (if available)
   - Configure your database connection and other environment variables

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run start:dev
```

The backend will be running at `http://localhost:3000`

## Frontend Setup

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

The frontend will be running at `http://localhost:3001`

## Features

- Modern, responsive user interface
- Task management capabilities
- Real-time updates
- RESTful API backend
- PostgreSQL database
- TypeScript for type safety

## Technologies Used

### Frontend
- Next.js - React framework
- TypeScript - Type safety
- Geist - Modern font family by Vercel

### Backend
- NestJS - Node.js framework
- Prisma - Database ORM
- PostgreSQL - Database
- TypeScript - Type safety

## Development

### Backend Development
- The backend uses NestJS with a modular architecture
- API endpoints are defined in the `src` directory
- Database schema is managed through Prisma in the `prisma` directory

### Frontend Development
- The frontend uses Next.js with the App Router
- Pages are located in the `app` directory
- Components are stored in the `components` directory

## Testing

### Backend Tests
```bash
cd backend
npm run test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## Deployment

### Backend Deployment
1. Build the application:
```bash
cd backend
npm run build
```

2. Start the production server:
```bash
npm run start:prod
```

### Frontend Deployment
The frontend can be deployed using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
