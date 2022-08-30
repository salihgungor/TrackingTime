import { User } from 'src/user/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TrackingtimeState {
  ON_PENDING = 'En attente de validation',
  VALID = 'Validé',
  REJECT = 'Refusé',
}

@Entity()
export class Trackingtime extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  start_date: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  end_date: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  nbDays: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  nbHalfDays: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  nbHours: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  companyComment: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  clientComment: string;

  @Column({
    type: 'enum',
    enum: TrackingtimeState,
    default: TrackingtimeState.ON_PENDING,
  })
  state: TrackingtimeState;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.trackingtimes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Client, (client) => client.trackingtimes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;
}
