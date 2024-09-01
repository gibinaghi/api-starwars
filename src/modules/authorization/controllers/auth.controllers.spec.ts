import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../strategies/jwt-auth.guard';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            singIn: jest.fn(),
            singOut: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('singIn', () => {
    it('should return access token and user data if credentials are valid and user is not already logged in', async () => {
      const loginCredentialsDto: LoginCredentialsDto = {
        email: 'test@example.com',
        password: 'testPassword',
      };
      const mockResponse = {
        code: 200,
        message: 'Ok',
        data: {
          accessToken: 'mockToken',
          user_auth: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
          },
        },
      };

      jest.spyOn(authService, 'singIn').mockResolvedValue(mockResponse as any);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await authController.singIn(res, loginCredentialsDto);

      expect(authService.singIn).toHaveBeenCalledWith(loginCredentialsDto);
      expect(res.status).toHaveBeenCalledWith(mockResponse.code);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const loginCredentialsDto: LoginCredentialsDto = {
        email: 'test@example.com',
        password: 'testPassword',
      };

      jest
        .spyOn(authService, 'singIn')
        .mockRejectedValue(new NotFoundException('User not found'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(
        authController.singIn(res, loginCredentialsDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if credentials are invalid', async () => {
      const loginCredentialsDto: LoginCredentialsDto = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      jest
        .spyOn(authService, 'singIn')
        .mockRejectedValue(new ForbiddenException('Invalid credentials'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(
        authController.singIn(res, loginCredentialsDto),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if user is already logged in', async () => {
      const loginCredentialsDto: LoginCredentialsDto = {
        email: 'test@example.com',
        password: 'testPassword',
      };

      jest
        .spyOn(authService, 'singIn')
        .mockRejectedValue(new ForbiddenException('User already logged in'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(
        authController.singIn(res, loginCredentialsDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('singOut', () => {
    it('should update user to log out if user is logged in', async () => {
      const userId = 1;
      const mockResponse = {
        code: 200,
        message: 'Logout successful',
        data: null,
      };

      jest.spyOn(authService, 'singOut').mockResolvedValue(mockResponse as any);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await authController.singOut(res, userId);

      expect(authService.singOut).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(mockResponse.code);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 1;

      jest
        .spyOn(authService, 'singOut')
        .mockRejectedValue(new NotFoundException('User not found'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await expect(authController.singOut(res, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
