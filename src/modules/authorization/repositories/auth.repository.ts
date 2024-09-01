import { Injectable } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../core/entities/user.entity';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  /**
   * ==========================================================
   * @Description Find One User by id
   * ==========================================================
   */
  async findByUserById(id: number): Promise<User> {
    try {
      return await this._userRepository.findOneBy({ id });
    } catch (e) {
      throw new ConflictException('Error interno Auth');
    }
  }

  /**
   * ==========================================================
   * @Description Find One User by email
   * ==========================================================
   */
  async findByUserByEmail(email: string): Promise<User> {
    try {
      return await this._userRepository.findOneBy({ email });
    } catch (e) {
      throw new ConflictException('Error interno Auth');
    }
  }

  /**
   * ==========================================================
   * @Description Update User
   * ==========================================================
   */
  async updateUser(id: number, data: any): Promise<void> {
    try {
      await this._userRepository.update(id, data);
    } catch (e) {
      throw new ConflictException('Error interno Auth');
    }
  }
}
