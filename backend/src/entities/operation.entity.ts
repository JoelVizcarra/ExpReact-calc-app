import { Column, Entity } from 'typeorm';
import BaseModel from './baseModel.entity';

@Entity()
export class Operation extends BaseModel {
  @Column()
  type: string;

  @Column({ nullable: true })
  cost: number;
}
