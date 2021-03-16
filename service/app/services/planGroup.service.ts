import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import resultFormat from 'app/helpers/resultFormat';
import PlanGroup from '../entities/planGroup.entity';
import Userinfo from '../entities/userinfo.entity';

@Service()
export default class PlanGroupService {
  repository: Repository<PlanGroup>

  constructor() {
    this.repository = getRepository(PlanGroup)
  }

  async create(
    { groupName, introduce }: Pick<PlanGroup, 'groupName' | 'introduce'>,
    founderId: number
  ) {
    try {
      const founderInfo = new Userinfo()
      founderInfo.id = founderId

      const planGroup = new PlanGroup()
      planGroup.groupName = groupName
      planGroup.introduce = introduce
      planGroup.founder = founderInfo

      await this.repository.save(planGroup)
    } catch (error) {
      return resultFormat.error('SERVICE_NOT_ERROR', error)
    }
    return resultFormat.success({ msg: '计划组创建成功' })
  }
}
