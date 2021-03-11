import { MinLength, IsNotEmpty } from 'class-validator'
import BaseEntity from './common/base.entity';
import {
  Entity,
  Column,
} from 'typeorm'

@Entity('sessions')
export default class Session extends BaseEntity {
  @MinLength(4, { message: 'username too short' })
  @IsNotEmpty({ message: 'must include username' })
  @Column()
  username: string

  @MinLength(10)
  @Column()
  token: string

  @Column()
  test: string
}

