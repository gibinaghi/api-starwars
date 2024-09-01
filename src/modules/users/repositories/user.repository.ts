import { Injectable } from '@nestjs/common/decorators';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../core/entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { CreateUser } from '../types/create-user.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  /**
   * ==========================================================
   * @Description Find One User by email
   * ==========================================================
   */
  async findByUserByEmail(email: string): Promise<User> {
    try {
      return await this._userRepository.findOneBy({ email });
    } catch (e) {
      throw new ConflictException('Error interno');
    }
  }

  /**
   * ==========================================================
   * @Description Create User
   * ==========================================================
   */
  async createUser(data: CreateUser): Promise<void> {
    try {
      await this._userRepository.save(data);
    } catch (e) {
      throw new ConflictException('Error interno User');
    }
  }
}
