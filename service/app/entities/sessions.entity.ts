import { MinLength, IsNotEmpty } from 'class-validator'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

/**
 * All validator can be applied to all controllers.
 * Reference document: https://github.com/typestack/class-validator
 * How to auto validaing? see: https://github.com/typestack/routing-controllers#auto-validating-action-params
 */

@Entity('sessions')
export default class Session {
  @PrimaryGeneratedColumn()
  id?: string

  @MinLength(4, { message: 'username too short' })
  @IsNotEmpty({ message: 'must include username' })
  @Column()
  username: string

  @MinLength(10)
  @Column()
  token: string

  @Column()
  test: string

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
