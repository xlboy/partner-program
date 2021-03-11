import { MinLength, IsNotEmpty } from 'class-validator'
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
  @Column()
  introduce: string

  @Column()
  groupName: string

  @Column()
  isNotify: string

  @ManyToOne(() => Userinfo)
  founder: Userinfo

  @OneToMany(() => PlanInfo, planInfo => planInfo.planGroup)
  planInfo: PlanInfo[];

  @ManyToMany(() => Userinfo, userinfo => userinfo.planGroup)
  @JoinTable()
  userinfo: Userinfo[];
}
