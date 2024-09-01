import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface/jwt-payload.type';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import * as moment from 'moment';
import ResponseUtil, {
  ResponseDto,
} from '../../../core/utils/set-response.utils';
import EncryptData from '../../../core/utils/encrypt.utils';
import { AuthRepository } from '../repositories/auth.repository';
import { envs } from '../../../common/envs/envs';
import { User } from '@app/core/entities/user.entity';

@Injectable()
export class AuthService extends ResponseUtil {
  constructor(
    private _authRepository: AuthRepository,
    private _jwtService: JwtService,
  ) {
    super();
  }

  /**
   * @description Post sign in
   * @param data { LoginCredentialsDto }
   * @returns { Promise<ResponseDto> }
   */
  async singIn(data: LoginCredentialsDto): Promise<ResponseDto> {
    const { email, password } = data;
    const foundUser = await this._authRepository.findByUserByEmail(email);
    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (foundUser.login_active) {
      throw new ForbiddenException('Usuario ya está conectado');
    }

    const encryp = new EncryptData(envs.jwt_secret);

    if (password !== encryp.decrypt(foundUser.password)) {
      throw new ForbiddenException(
        'Por favor, compruebe sus credenciales de inicio de sesión',
      );
    }

    // Verificar si ya hay una sesión activa y desactivarla
    if (foundUser.login_active) {
      await this.invalidateToken(foundUser.id);
    }

    const payload: JwtPayload = { email, id: foundUser.id };
    const accessToken: string = this._jwtService.sign(payload);

    const user_auth = {
      login_active: true,
      date_session: new Date(moment().format()),
      current_token: accessToken,
    };

    await this._authRepository.updateUser(foundUser.id, user_auth);

    const dataLogin = {
      accessToken,
      user_auth: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
    };

    this.setSuccess(200, 'Ok', dataLogin);
    return this.setSend();
  }

  /**
   * @description Invalidate the current token
   * @param userId { number }
   */
  private async invalidateToken(userId: number): Promise<void> {
    const user_auth = {
      login_active: false,
      current_token: null,
      date_session: null,
    };
    await this._authRepository.updateUser(userId, user_auth);
  }

  /**
   * @description Get sign out
   * @param id { number }
   * @returns { Promise<ResponseDto> }
   */
  async singOut(id: number): Promise<ResponseDto> {
    const foundUser = await this._authRepository.findByUserById(id);
    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (foundUser && foundUser.login_active === true) {
      await this.invalidateToken(foundUser.id);
    }

    this.setSuccess(200, 'Se ha cerrado la sesión correctamente');
    return this.setSend();
  }

  /**
   * @description Validate login active
   * @param id { number }
   * @returns { Promise<User | null> }
   */
  async validateUserById(id: number): Promise<User | null> {
    const user = await this._authRepository.findByUserById(id);
    return user && user.login_active ? user : null;
  }
}
