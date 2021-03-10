import { MinLength, IsNotEmpty } from 'class-validator'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

@Entity('userinfo')
export default class Session {
  @PrimaryGeneratedColumn()
  id?: string

  @MinLength(4, { message: '滚' })
  @IsNotEmpty({ message: 'username不允许为空哦' })
  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  nickname: string

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
