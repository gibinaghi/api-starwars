import { UnauthorizedException } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('should allow access when user has one of the required roles', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['admin']),
    };
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest
          .fn()
          .mockReturnValue({ user: { role: { description: 'admin' } } }),
      }),
    };
    const rolesGuard = new RolesGuard(reflector as any);
    expect(rolesGuard.canActivate(context as any)).toBe(true);
  });

  it('should deny access when user has no roles', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['admin']),
    };
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest
          .fn()
          .mockReturnValue({ user: { role: { description: 'user' } } }),
      }),
    };
    const rolesGuard = new RolesGuard(reflector as any);
    expect(() => rolesGuard.canActivate(context as any)).toThrow(
      UnauthorizedException,
    );
  });
});
