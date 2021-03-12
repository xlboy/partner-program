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
  @IsNotEmpty({ message: '用户名不可为空' })
  @Column()
  username: string

  @IsNotEmpty({ message: '密码不可为空' })
  @Column()
  password: string

  @Column({ nullable: true })
  email?: string

  @IsNotEmpty({ message: '昵称不可为空' })
  @Column()
  nickname: string

  @Column({ nullable: true })
  age?: number;

  @Column({ nullable: true })
  sex?: boolean;

  @OneToMany(() => PlanInfo, planInfo => planInfo.userinfo)
  planInfo: PlanInfo[];

  @ManyToMany(() => PlanGroup, planGroup => planGroup.userinfo)
  planGroup: PlanGroup[];
}
