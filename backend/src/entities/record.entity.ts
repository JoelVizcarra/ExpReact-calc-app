import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseModel from './baseModel.entity';
import { User } from './user.entity';
import { Operation } from './operation.entity';

@Entity()
export class Record extends BaseModel {
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Operation)
  @JoinColumn()
  operation: Operation;

  @Column()
  amount: number;

  @Column({ nullable: true })
  operationResponse: string;
}
