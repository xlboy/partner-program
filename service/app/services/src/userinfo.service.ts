import { getRepository, MongoRepository, Repository } from 'typeorm'
import { validate } from 'class-validator'
import { Service } from 'typedi'
import Userinfo from 'app/entities/userinfo.entity'

@Service()
export class UserinfoService {
  repository: Repository<Userinfo>

  constructor() {
    this.repository = getRepository(Userinfo)
  }

  async create(userinfo: Userinfo) {
    validate(userinfo).then(errors => {
      if (errors.length > 0) {
        console.error('errors', errors[0].constraints)
      } else {
        console.log('正确了哦')
      }
    })
    // return await this.repository.save(userinfo)
  }
}
