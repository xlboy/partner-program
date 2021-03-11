import { PlanInfoObj } from 'app/@types/planInfo.type'
import { MinLength, IsNotEmpty } from 'class-validator'
import {
  Entity,
  Column,
  ManyToOne
} from 'typeorm'
import BaseEntity from './common/base.entity'
import PlanGroup from './planGroup.entity'
import Userinfo from './userinfo.entity'

@Entity('plan_info')
export default class PlanInfo extends BaseEntity {
  @Column()
  introduce: string

  @Column()
  groupName: string

  @Column()
  dayTime: number;

  @Column('simple-array')
  onDayAllPlans: PlanInfoObj[];

  @ManyToOne(() => Userinfo, userinfo => userinfo.planInfo)
  userinfo: Userinfo;

  @ManyToOne(() => PlanGroup, planGroup => planGroup.planInfo)
  planGroup: PlanGroup;
}
