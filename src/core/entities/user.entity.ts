import { EntityBase } from '../../core/classes/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity({ name: 'users' })
export class User extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  login_active: boolean;

  @Column({ nullable: true })
  date_session: Date;

  @Column({ nullable: true })
  current_token: string;

  @ManyToOne(() => Rol, (rol) => rol.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Rol;
}
