import { SocketContentType, MessageType } from 'app/constants/socket'
import { MinLength, IsNotEmpty } from 'class-validator'
import {
  Entity,
  Column,
  ManyToOne
} from 'typeorm'
import BaseEntity from './common/base.entity'
import PlanGroup from './planGroup.entity'
import Userinfo from './userinfo.entity'
@Entity('im_plan_group_message')
export default class ImPlanGroupMessage extends BaseEntity {

  constructor(data?: { [k in keyof ImPlanGroupMessage]?: ImPlanGroupMessage[k] }) {
    super()
    if (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    }
  }


  @IsNotEmpty({ message: 'content不可为空' })
  @Column("simple-json")
  content: { type: SocketContentType; content: any };


  @ManyToOne(() => Userinfo, userinfo => userinfo.planInfo)
  userinfo: Userinfo;

  @ManyToOne(() => PlanGroup, planGroup => planGroup.planInfo)
  planGroup: PlanGroup;
}
