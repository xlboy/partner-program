import { CompleteStatus } from 'app/constants/planInfo'
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
  @IsNotEmpty({ message: 'dayTime不可为空' })
  @Column()
  dayTime: number;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column({
    default: true
  })
  isRemind: boolean;

  @Column()
  content: boolean;

  @Column({
    type: "enum",
    enum: CompleteStatus,
    default: CompleteStatus.NOT_START
  })
  completeStatus?: CompleteStatus

  @Column()
  remark?: string;

  @ManyToOne(() => Userinfo, userinfo => userinfo.planInfo)
  userinfo: Userinfo;

  @ManyToOne(() => PlanGroup, planGroup => planGroup.planInfo)
  planGroup: PlanGroup;
}
