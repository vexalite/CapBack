import request from 'supertest';
import app from 'express'; // Update the path to your app accordingly
import { createJWT, hashPassword, comparePasswords } from '../auth';
import prisma from '../../prisma/db';

jest.mock('../../prisma/db', () => {
    const { PrismaClient } = jest.requireActual('../../prisma/db');
    return {
      PrismaClient: class MockPrismaClient extends PrismaClient {
        user = {
          findFirst: jest.fn(),
          create: jest.fn(),
        };
      },
    };
  }); // Mock the Prisma client

  describe('User API', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a new user', async () => {
      const mockHashedPassword = 'hashedPassword';
      const mockCreatedUser = { id: 1, name: 'John Doe', username: 'john.doe', password: mockHashedPassword };
      const mockToken = 'generatedToken';
  
      // Mock hashPassword function
      (hashPassword as jest.Mock).mockResolvedValueOnce(mockHashedPassword);
  
      // Mock prisma.user.findFirst function
      (prisma.user.findFirst as jest.Mock).mockResolvedValueOnce(null);
  
      // Mock prisma.user.create function
      (prisma.user.create as jest.Mock).mockResolvedValueOnce(mockCreatedUser);
  
      // Mock createJWT function
      (createJWT as jest.Mock).mockReturnValueOnce(mockToken);
  
      // Your request to create a new user using 'app' and 'supertest'
      // For example:
      const response = await request(app).post('/api/createUser').send({
        name: 'John Doe',
        username: 'john.doe',
        password: 'password',
      });
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: mockToken });
    });
  
    // Add more test cases for other functions
  });