import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import Userinfo from 'app/entities/userinfo.entity'
import validateEntity from 'app/helpers/validateEntity'
import resultFormat from 'app/helpers/resultFormat';
;
import jwt from 'jsonwebtoken'
import { UserPrivateKey } from 'app/constants/user'
import { Result } from 'app/@types/sys.type';

@Service()
export default class UserinfoService {
  repository: Repository<Userinfo>

  constructor() {
    this.repository = getRepository(Userinfo)
  }

  async create(userinfo: Userinfo): Promise<Result.Format> {

    const verifUserRepeat = async (username: string): Promise<boolean> => {
      const findResult = await this.repository.find({ username })
      return findResult.length > 0
    }

    const isRepeat = await verifUserRepeat(userinfo.username)

    if (isRepeat) {
      return resultFormat.error('DATA_REPEAT', '用户名已存在')
    } else {
      await this.repository.save(userinfo)
      return resultFormat.success({ msg: '创建成功' })
    }

  }

  async findUser(userinfo: Pick<Userinfo, 'username' | 'password'>): Promise<Userinfo | undefined> {
    const { username, password } = userinfo
    const findResult = await (() => {
      const where = { username, password }
      const select: (keyof Userinfo)[] = ['nickname', 'sex', 'age', 'email', 'id', 'username']
      return this.repository.findOne({ where, select })
    })();

    return findResult
  }

  findUserOne(id: number): Promise<Userinfo> {
    return this.repository.findOne({ where: { id } })
  }

}
