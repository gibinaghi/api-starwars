import { EntityBase } from '../../core/classes/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  episode_id: number;

  @Column({ nullable: true })
  opening_crawl: string;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: true })
  producer: string;

  @Column({ nullable: true })
  release_date: Date;

  /*@Column({ nullable: true })
  species: string[];

  @Column({ nullable: true })
  starships: string[];

  @Column({ nullable: true })
  vehicles: string[];

  @Column({ nullable: true })
  characters: string[];

  @Column({ nullable: true })
  planets: string[];*/

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  created: Date;

  @Column({ nullable: true })
  edited: Date;
}
