import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { RolRepository } from '../repositories/rol.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';
import EncryptData from '../../../core/utils/encrypt.utils';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;
  let rolRepository: jest.Mocked<RolRepository>;
  let encryptSpy: jest.SpyInstance;

  beforeEach(() => {
    userRepository = {
      findByUserByEmail: jest.fn(),
      createUser: jest.fn(),
    } as any;

    rolRepository = {
      findByRolById: jest.fn(),
    } as any;

    userService = new UserService(userRepository, rolRepository);

    // Mock de la encriptación
    encryptSpy = jest
      .spyOn(EncryptData.prototype, 'encrypt')
      .mockImplementation((value) => `encrypted-${value}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user when email does not exist and role exists', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      rol_id: 1,
    };

    userRepository.findByUserByEmail.mockResolvedValue(null);
    rolRepository.findByRolById.mockResolvedValue({
      id: 1,
      description: 'Admin',
    } as any);
    userRepository.createUser.mockResolvedValue({ ...createUserDto } as any);

    const result = await userService.createUser(createUserDto);

    expect(userRepository.findByUserByEmail).toHaveBeenCalledWith(
      'john.doe@example.com',
    );
    expect(rolRepository.findByRolById).toHaveBeenCalledWith(1);
    expect(encryptSpy).toHaveBeenCalledWith('Password123!');
    expect(userRepository.createUser).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'encrypted-Password123!',
      login_active: false,
      rol_id: 1,
    });
    expect(result).toEqual({
      code: 201,
      message: 'Usuario creado correctamente',
      error: false,
    });
  });

  it('should throw a ForbiddenException when email already exists', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      rol_id: 1,
    };

    userRepository.findByUserByEmail.mockResolvedValue(createUserDto as any);

    await expect(userService.createUser(createUserDto)).rejects.toThrow(
      ForbiddenException,
    );

    expect(userRepository.findByUserByEmail).toHaveBeenCalledWith(
      'john.doe@example.com',
    );
    expect(userRepository.createUser).not.toHaveBeenCalled();
  });

  it('should throw a NotFoundException when role does not exist', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      rol_id: 1,
    };

    userRepository.findByUserByEmail.mockResolvedValue(null);
    rolRepository.findByRolById.mockResolvedValue(null);

    await expect(userService.createUser(createUserDto)).rejects.toThrow(
      NotFoundException,
    );

    expect(userRepository.findByUserByEmail).toHaveBeenCalledWith(
      'john.doe@example.com',
    );
    expect(rolRepository.findByRolById).toHaveBeenCalledWith(1);
    expect(userRepository.createUser).not.toHaveBeenCalled();
  });
});
