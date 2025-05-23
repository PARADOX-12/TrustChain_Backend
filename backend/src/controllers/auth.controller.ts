import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role } from '@prisma/client';
import { AppError } from '../middleware/error.middleware.js';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'MANUFACTURER', 'DISTRIBUTOR', 'REGULATOR', 'PHARMACY', 'USER']).optional(),
  walletAddress: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

// Helper function to generate JWT token
const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register a new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Convert role to uppercase before validation
    if (req.body.role) {
      req.body.role = req.body.role.toUpperCase();
    }

    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return next(new AppError('User already exists with this email', 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role 
                ? Role[validatedData.role.toUpperCase() as keyof typeof Role] || Role.USER // Convert and check against Prisma Role enum
                : Role.USER, // Default to USER if role is not provided
        walletAddress: validatedData.walletAddress,
      },
    });

    // Generate JWT token
    const token = signToken(newUser.id);

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Login user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // Generate JWT token
    const token = signToken(user.id);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.errors[0].message, 400));
    }
    next(error);
  }
};

// Forgot password
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This would typically send a password reset email
    // For now, we'll just return a success message
    res.status(200).json({
      status: 'success',
      message: 'Password reset instructions sent to email',
    });
  } catch (error) {
    next(error);
  }
};

// Reset password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // This would typically verify a reset token and update the password
    // For now, we'll just return a success message
    res.status(200).json({
      status: 'success',
      message: 'Password has been reset',
    });
  } catch (error) {
    next(error);
  }
};

// MetaMask login
export const loginWithMetamask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return next(new AppError('Wallet address is required', 400));
        }

        // Find user by wallet address
        const user = await prisma.user.findUnique({
            where: { walletAddress: walletAddress.toLowerCase() } as any, // Cast to any temporarily to satisfy type checker
        });

        // Check if user exists
        if (!user) {
            // Decide behavior: return error or auto-register
            // For now, let's return an error if not found. Auto-registration can be added later if needed.
             return next(new AppError('User not found with this wallet address. Please register.', 404));
            // Or for auto-registration (example - needs careful consideration of defaults):
            // const newUser = await prisma.user.create({
            //     data: {
            //         walletAddress: walletAddress.toLowerCase(),
            //         role: Role.USER, // Default role
            //         // Provide default or placeholder values for required fields like name, email, password
            //         name: 'MetaMask User', 
            //         email: `metamask_user_${Date.now()}@example.com`, // Placeholder email
            //         password: 'default_password_change_me' // Placeholder password
            //     }
            // });
            // user = newUser; // Use the newly created user
        }

        // Generate JWT token
        const token = signToken(user.id);

        // Remove password from response (even if using placeholder, good practice)
        const { password, ...userWithoutPassword } = user;

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: userWithoutPassword,
            },
        });
    } catch (error) {
        next(error);
    }
};
