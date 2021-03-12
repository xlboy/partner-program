import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import Userinfo from 'app/entities/userinfo.entity'
import validateEntity from 'app/helpers/validateEntity'
import statusFormat, { StatusCode } from 'app/helpers/statusFormat';

@Service()
export class UserinfoService {
  repository: Repository<Userinfo>

  constructor() {
    this.repository = getRepository(Userinfo)
  }

  async create(userinfo: Userinfo) {

    const verifUserRepeat = async (username: string): Promise<boolean> => {
      const findResult = await this.repository.find({ username })
      return findResult.length > 0
    }

    try {
      await validateEntity(userinfo)
      const isRepeat = await verifUserRepeat(userinfo.username)

      if (isRepeat) {
        return statusFormat.error({ msg: '用户名已存在', code: StatusCode.DATA_REPEAT })
      } else {
        await this.repository.save(userinfo)
        return statusFormat.success({ msg: '创建成功' })
      }

    } catch (error) {
      return statusFormat.error({ msg: error, code: StatusCode.DATA_WRONG })
    }

  }

  async login(userinfo: { username: string, password: string }) {
    const { username, password } = userinfo
    const findResult = await this.repository.find({ username, password })
    if (findResult.length > 0) {
      return statusFormat.success({ msg: '登陆成功' })
    } else {
      return statusFormat.success({ msg: '账号或密码有误' })
    }
  }
}
