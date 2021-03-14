import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import Userinfo from 'app/entities/userinfo.entity'
import validateEntity from 'app/common/validateEntity'
import statusFormat from 'app/common/statusFormat';
import { Result } from 'app/@types/sys.type';
import jwt from 'jsonwebtoken'
import { secretOrPrivateKey } from 'app/constants/user'

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
        return statusFormat.error({ msg: '用户名已存在', code: Result.Code.DATA_REPEAT })
      } else {
        await this.repository.save(userinfo)
        return statusFormat.success({ msg: '创建成功' })
      }
    } catch (error) {
      return statusFormat.error({ msg: error, code: Result.Code.DATA_WRONG })
    }

  }

  async findUser(userinfo: { username: string, password: string }): Promise<Userinfo | undefined> {
    const { username, password } = userinfo
    const findResult = await (() => {
      const where = { username, password }
      const select: (keyof Userinfo)[] = ['nickname', 'sex', 'age', 'email', 'id', 'username']
      return this.repository.findOne({ where, select })
    })();

    return findResult
  }

  generateJWT(userinfo: Userinfo): string {
    const { username, id } = userinfo
    const encryptionObj = {
      username,
      id,
      date: parseInt(String(+new Date() / 1000))
    }
    const tokenResult = jwt.sign(encryptionObj, secretOrPrivateKey, {
      expiresIn: '2d'
    })
    return tokenResult
  }
}
