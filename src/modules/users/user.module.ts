import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/entities/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { Rol } from '../../core/entities/rol.entity';
import { RolRepository } from './repositories/rol.repository';
import { AuthModule } from '../authorization/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol]), AuthModule],
  providers: [UserRepository, UserService, RolRepository],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
