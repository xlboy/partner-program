import { MinLength, IsNotEmpty, MaxLength } from 'class-validator';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import BaseEntity from './common/base.entity'
import PlanInfo from './planInfo.entity'
import Userinfo from './userinfo.entity'

@Entity('plan_group')
export default class PlanGroup extends BaseEntity {
  @MaxLength(30, { message: 'introduce内容长度不可超过30个字符'})
  @IsNotEmpty({ message: 'introduce不可为空' })
  @Column()
  introduce: string

  @MaxLength(15, { message: 'groupName长度不可超过15个字符'})
  @IsNotEmpty({ message: 'groupName不可为空' })
  @Column()
  groupName: string

  @Column({
    default: true
  })
  isNotify?: boolean;

  @Column()
  groupNum?: number;

  @ManyToOne(() => Userinfo)
  founder: Userinfo

  @OneToMany(() => PlanInfo, planInfo => planInfo.planGroup)
  planInfo: PlanInfo[];

  @ManyToMany(() => Userinfo, userinfo => userinfo.planGroup)
  @JoinTable()
  userinfo: Userinfo[];
}
