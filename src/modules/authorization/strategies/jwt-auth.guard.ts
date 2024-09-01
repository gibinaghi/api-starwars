import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    const decoded = this.jwtService.decode(token) as {
      id: number;
      email: string;
    };

    const user = await this.authService.validateUserById(decoded.id);
    if (!user || user.current_token !== token) {
      throw new UnauthorizedException('Token inválido o sesión cerrada');
    }

    return super.canActivate(context) as Promise<boolean>;
  }

  private extractTokenFromRequest(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}
