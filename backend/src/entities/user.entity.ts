import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  OneToOne,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import BaseModel from './baseModel.entity';
import { Record } from './record.entity';
import { Balance } from './balance.entity';

@Entity('users')
export class User extends BaseModel {
  @Column()
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @OneToOne(() => Balance, (balance) => balance.user)
  balance: Balance;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
      verified: undefined,
      verificationCode: undefined,
    };
  }
}
