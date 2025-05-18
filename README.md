# TrustChain

A blockchain-based pharmaceutical supply chain verification system.

## Project Overview

TrustChain is a comprehensive platform that leverages blockchain technology to ensure the authenticity and traceability of pharmaceutical products throughout the supply chain. The system provides end-to-end visibility from manufacturers to patients, helping combat counterfeit drugs and ensuring regulatory compliance.

## Repository Structure

This repository contains both the frontend and backend components of the TrustChain system:

- `/backend` - Node.js/Express backend with TypeScript, PostgreSQL, and Prisma ORM
- `/src` - React/TypeScript frontend with UI components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

See the [Backend README](./backend/README.md) for detailed setup instructions.

### Frontend Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Features

- Blockchain-based drug verification
- QR code scanning for product authentication
- Supply chain tracking and monitoring
- User management with role-based access control
- Admin dashboard with analytics

## Technology Stack

### Backend

- Node.js with Express.js
- TypeScript
- PostgreSQL with Prisma ORM
- JWT Authentication

### Frontend

- React with TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Query

## Roadmap

See the [TrustChain-Roadmap.md](./TrustChain-Roadmap.md) file for the detailed project roadmap.
