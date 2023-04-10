import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseModel from './baseModel.entity';
import { User } from './user.entity';

@Entity()
export class Balance extends BaseModel {
  @OneToOne(() => User, (user) => user.balance)
  @JoinColumn()
  user: User;

  @Column()
  credits: number;
}
