# TrustChain Backend

Backend API for the TrustChain pharmaceutical supply chain verification system.

## Technology Stack

- Node.js with Express.js
- TypeScript
- PostgreSQL with Prisma ORM
- JWT Authentication
- RESTful API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the setup script to create your `.env` file:
   ```
   npm run setup
   ```
   This script will guide you through setting up your database configuration and generate a secure JWT secret.

### Database Setup

1. Make sure PostgreSQL is running
2. Create a database for the application
3. Update the `DATABASE_URL` in the `.env` file
4. Run database migrations:
   ```
   npm run migrate:dev
   ```
5. Generate Prisma client:
   ```
   npm run prisma:generate
   ```

### Running the Application

Development mode:

```
npm run dev
```

Production mode:

```
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users

- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/profile` - Update current user profile
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PATCH /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Project Structure

```
backend/
├── prisma/              # Prisma schema and migrations
├── scripts/             # Utility scripts
│   └── setup-db.js      # Database setup script
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── .env                 # Environment variables
├── .env.example         # Example environment variables
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## License

This project is licensed under the ISC License.
