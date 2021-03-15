import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import Userinfo from 'app/entities/userinfo.entity'
import validateEntity from 'app/common/validateEntity'
import resultFormat from 'app/common/resultFormat';
import { Result } from 'app/@types/sys.type';
import jwt from 'jsonwebtoken'
import { UserPrivateKey  } from 'app/constants/user'

@Service()
export default class UserinfoService {
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
        return resultFormat.error('DATA_REPEAT', '用户名已存在')
      } else {
        await this.repository.save(userinfo)
        return resultFormat.success({ msg: '创建成功' })
      }
    } catch (error) {
      return resultFormat.error('DATA_WRONG', error)
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

  findUserOne(id: number) {
    return this.repository.findOne({ where: { id } })
  }

  generateJWT(userinfo: Pick<Userinfo, 'username' | 'id'>): string {
    const { username, id } = userinfo
    const encryptionObj = {
      username,
      id,
      date: parseInt(String(+new Date() / 1000))
    }
    const tokenResult = jwt.sign(encryptionObj, UserPrivateKey , {
      expiresIn: '2d'
    })
    return tokenResult
  }
}
