import { CompleteStatus, ContentTypes } from 'app/constants/planInfo'
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

  constructor(data?: { [k in keyof PlanInfo]?: PlanInfo[k] }) {
    super()
    if (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    }
  }

  @IsNotEmpty({ message: 'dayTime不可为空' })
  @Column()
  dayTime: number;

  @IsNotEmpty({ message: 'startTime不可为空' })
  @Column()
  startTime: number;

  @IsNotEmpty({ message: 'endTime不可为空' })
  @Column()
  endTime: number;


  @IsNotEmpty({ message: 'contentType不可为空' })
  @Column({
    type: "enum",
    enum: ContentTypes,
    default: ContentTypes.DIY
  })
  contentType: ContentTypes;

  @IsNotEmpty({ message: 'content不可为空' })
  @Column()
  content: string;

  @Column({
    type: "enum",
    enum: CompleteStatus,
    default: CompleteStatus.NOT_START
  })
  completeStatus?: CompleteStatus

  @Column({
    default: true
  })
  isRemind?: boolean;

  @Column({
    nullable: true
  })
  remark?: string;

  @ManyToOne(() => Userinfo, userinfo => userinfo.planInfo)
  userinfo: Userinfo;

  @ManyToOne(() => PlanGroup, planGroup => planGroup.planInfo)
  planGroup: PlanGroup;
}
