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

  constructor(data?: { [k in keyof Userinfo]?: Userinfo[k] }) {
    super()
    if (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    }
  }

  @MaxLength(16, { message: 'username长度不可超过10个字符' })
  @IsNotEmpty({ message: 'username不可为空' })
  @Column()
  username: string

  @MaxLength(16, { message: 'password长度不可超过16个字符' })
  @IsNotEmpty({ message: 'password不可为空' })
  @Column()
  password: string

  @Column({ nullable: true })
  email?: string

  @MaxLength(16, { message: 'nickname长度不可超过8个字符' })
  @IsNotEmpty({ message: 'nickname不可为空' })
  @Column()
  nickname: string

  @Column({ default: 'http://q1.qlogo.cn/g?b=qq&nk=52852983&s=640' })
  avatar?: string;

  @Column({ nullable: true })
  age?: number;

  @Column({ default: true })
  sex?: boolean;

  @OneToMany(() => PlanInfo, planInfo => planInfo.userinfo)
  planInfo: PlanInfo[];

  @ManyToMany(() => PlanGroup, planGroup => planGroup.userinfos)
  planGroup: PlanGroup[];
}
