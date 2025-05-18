import { Request, Response } from 'express';
import { register, login } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;
  let prisma: any;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    prisma = new PrismaClient();
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_EXPIRES_IN = '1h';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      mockRequest.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'USER',
      };

      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

      const newUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'USER',
        walletAddress: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.user.create.mockResolvedValue(newUser);
      (jwt.sign as jest.Mock).mockReturnValue('test_token');

      // Act
      await register(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashed_password',
          role: 'USER',
          walletAddress: undefined,
        },
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: '1' },
        'test-secret',
        { expiresIn: '1h' }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        token: 'test_token',
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'USER',
            walletAddress: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should return an error if user already exists', async () => {
      // Arrange
      mockRequest.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
      });

      // Act
      await register(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'User already exists with this email',
          statusCode: 400,
        })
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      // Arrange
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'USER',
        walletAddress: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('test_token');

      // Act
      await login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: '1' },
        'test-secret',
        { expiresIn: '1h' }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        token: 'test_token',
        data: {
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'USER',
            walletAddress: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          },
        },
      });
    });

    it('should return an error if credentials are invalid', async () => {
      // Arrange
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      prisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act
      await login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Incorrect email or password',
          statusCode: 401,
        })
      );
    });
  });
});
