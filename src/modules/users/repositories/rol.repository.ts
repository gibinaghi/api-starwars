import { Injectable } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { Rol } from '../../../core/entities/rol.entity';

@Injectable()
export class RolRepository {
  constructor(
    @InjectRepository(Rol)
    private readonly _rolRepository: Repository<Rol>,
  ) {}

  /**
   * ==========================================================
   * @Description Find One Rol by id
   * ==========================================================
   */
  async findByRolById(id: number): Promise<Rol> {
    try {
      return await this._rolRepository.findOneBy({ id });
    } catch (e) {
      throw new ConflictException('Error interno Rol');
    }
  }
}
