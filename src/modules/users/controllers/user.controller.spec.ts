import { UserController } from './user.controller';
describe('UserController', () => {
  it('should return 201 status when user is created with valid data', async () => {
    const mockUserService = {
      createUser: jest.fn().mockResolvedValue({ code: 201, data: {} }),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const userController = new UserController(mockUserService as any);
    const createUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      rol_id: 1,
    };

    await userController.createUser(mockResponse as any, createUserDto);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ code: 201, data: {} });
  });

  it('should return 409 status when user is created with existing email', async () => {
    const mockUserService = {
      createUser: jest
        .fn()
        .mockResolvedValue({ code: 409, message: 'Conflict' }),
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const userController = new UserController(mockUserService as any);
    const createUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      rol_id: 1,
    };

    await userController.createUser(mockResponse as any, createUserDto);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 409,
      message: 'Conflict',
    });
  });
});
