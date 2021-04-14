import { SocketContentType } from 'app/constants/socket'
import { MinLength, IsNotEmpty } from 'class-validator'
import {
  Entity,
  Column,
  ManyToOne
} from 'typeorm'
import BaseEntity from './common/base.entity'
import Userinfo from './userinfo.entity'
@Entity('im_offline_message')
export default class ImOfflineMessage extends BaseEntity {

  constructor(data?: { [k in keyof ImOfflineMessage]?: ImOfflineMessage[k] }) {
    super()
    if (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    }
  }

  @IsNotEmpty({ message: 'content不可为空' })
  @Column("simple-json")
  content: { contentType: SocketContentType; content: any };


  @ManyToOne(() => Userinfo, userinfo => userinfo.planInfo)
  userinfo: Userinfo;

}
