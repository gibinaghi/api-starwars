import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ResponseUtil, {
  ResponseDto,
} from '../../../core/utils/set-response.utils';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/user.dto';
import EncryptData from '../../../core/utils/encrypt.utils';
import { RolRepository } from '../repositories/rol.repository';

@Injectable()
export class UserService extends ResponseUtil {
  constructor(
    private _userRepository: UserRepository,
    private _rolRepository: RolRepository,
  ) {
    super();
  }

  /**
   * @description Create user
   * @param data { CreateUserDto }
   * @returns { Promise<ResponseDto> }
   */
  async createUser(data: CreateUserDto): Promise<ResponseDto> {
    const { name, email, password, rol_id } = data;

    const encryp = new EncryptData(process.env.JWT_SECRET);

    if (await this._userRepository.findByUserByEmail(email)) {
      throw new ForbiddenException('El email de usuario ya existe');
    }

    const rol = await this._rolRepository.findByRolById(rol_id);
    if (!rol) {
      throw new NotFoundException('No se encontro el rol');
    }

    await this._userRepository.createUser({
      name,
      email,
      password: encryp.encrypt(password),
      login_active: false,
      rol_id,
    });
    this.setSuccess(201, 'Usuario creado correctamente');
    return this.setSend();
  }
}
