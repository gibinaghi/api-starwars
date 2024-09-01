import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import EncryptData from '../../../core/utils/encrypt.utils';
import { JwtAuthGuard } from '../strategies/jwt-auth.guard';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: AuthRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            findByUserByEmail: jest.fn(),
            findByUserById: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        JwtAuthGuard,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return access token and user data if credentials are valid and user is not already logged in', async () => {
    const loginCredentials: LoginCredentialsDto = {
      email: 'test@example.com',
      password: 'testPassword',
    };
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: new EncryptData(process.env.JWT_SECRET).encrypt('testPassword'),
      login_active: false,
    };
    const mockToken = 'mockToken';

    jest
      .spyOn(authRepository, 'findByUserByEmail')
      .mockResolvedValue(mockUser as any);
    jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

    const result = await authService.singIn(loginCredentials);
    console.log(result);

    expect(result.code).toBe(200);
    expect(result.message).toBe('Ok');
    expect(result.data).toEqual({
      accessToken: mockToken,
      user_auth: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      },
    });
    expect(authRepository.updateUser).toHaveBeenCalledWith(mockUser.id, {
      login_active: true,
      date_session: expect.any(Date),
      current_token: mockToken,
    });
  });

  it('should throw NotFoundException if user is not found', async () => {
    const loginCredentials: LoginCredentialsDto = {
      email: 'test@example.com',
      password: 'testPassword',
    };

    jest.spyOn(authRepository, 'findByUserByEmail').mockResolvedValue(null);

    await expect(authService.singIn(loginCredentials)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw ForbiddenException if credentials are invalid', async () => {
    const loginCredentials: LoginCredentialsDto = {
      email: 'test@example.com',
      password: 'wrongPassword',
    };
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: new EncryptData(process.env.JWT_SECRET).encrypt('testPassword'),
      login_active: false,
    };

    jest
      .spyOn(authRepository, 'findByUserByEmail')
      .mockResolvedValue(mockUser as any);

    await expect(authService.singIn(loginCredentials)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw ForbiddenException if user is already logged in', async () => {
    const loginCredentials: LoginCredentialsDto = {
      email: 'test@example.com',
      password: 'testPassword',
    };
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: new EncryptData(process.env.JWT_SECRET).encrypt('testPassword'),
      login_active: true,
    };

    jest
      .spyOn(authRepository, 'findByUserByEmail')
      .mockResolvedValue(mockUser as any);

    await expect(authService.singIn(loginCredentials)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should update user to log out if user is logged in', async () => {
    const mockUser = {
      id: 1,
      login_active: true,
    };

    jest
      .spyOn(authRepository, 'findByUserById')
      .mockResolvedValue(mockUser as any);

    const result = await authService.singOut(mockUser.id);

    expect(result.code).toBe(200);
    expect(result.message).toBe('Se ha cerrado la sesión correctamente');
    expect(authRepository.updateUser).toHaveBeenCalledWith(mockUser.id, {
      login_active: false,
      date_session: null,
      current_token: null,
    });
  });

  it('should throw NotFoundException if user is not found', async () => {
    jest.spyOn(authRepository, 'findByUserById').mockResolvedValue(null);

    await expect(authService.singOut(1)).rejects.toThrow(NotFoundException);
  });

  it('should still return success if user is already logged out', async () => {
    const mockUser = {
      id: 1,
      login_active: false,
    };

    jest
      .spyOn(authRepository, 'findByUserById')
      .mockResolvedValue(mockUser as any);

    const result = await authService.singOut(mockUser.id);

    expect(result.code).toBe(200);
    expect(result.message).toBe('Se ha cerrado la sesión correctamente');
    expect(authRepository.updateUser).not.toHaveBeenCalled();
  });
});
