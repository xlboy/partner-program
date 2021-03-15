import { MinLength, IsNotEmpty, MaxLength } from 'class-validator'
import {
  Entity,
  ManyToMany,
  Column,
  OneToMany,
} from 'typeorm'
import BaseEntity from './common/base.entity'
import PlanGroup from './planGroup.entity'
import PlanInfo from './planInfo.entity'

@Entity('userinfo')
export default class Userinfo extends BaseEntity {
  @MaxLength(16, { message: '用户名长度不可超过10个字符' })
  @IsNotEmpty({ message: '用户名不可为空' })
  @Column()
  username: string

  @MaxLength(16, { message: '密码长度不可超过16个字符' })
  @IsNotEmpty({ message: '密码不可为空' })
  @Column()
  password: string

  @Column({ nullable: true })
  email?: string

  @MaxLength(16, { message: '昵称长度不可超过8个字符' })
  @IsNotEmpty({ message: '昵称不可为空' })
  @Column()
  nickname: string

  @Column({ nullable: true })
  age?: number;

  @Column({ default: true })
  sex?: boolean;

  @OneToMany(() => PlanInfo, planInfo => planInfo.userinfo)
  planInfo: PlanInfo[];

  @ManyToMany(() => PlanGroup, planGroup => planGroup.userinfo)
  planGroup: PlanGroup[];

  @OneToMany(() => PlanGroup, planGroup => planGroup.founder, { cascade: true })
  planGroupFounder: PlanGroup[];
}
