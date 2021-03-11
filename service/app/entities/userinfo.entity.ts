import { MinLength, IsNotEmpty } from 'class-validator'
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

  @Column()
  age: number;

  @Column()
  sex: boolean;

  @OneToMany(() => PlanInfo, planInfo => planInfo.userinfo)
  planInfo: PlanInfo[];

  @ManyToMany(() => PlanGroup, planGroup => planGroup.userinfo)
  planGroup: PlanGroup[];
}
