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
      planGroup.groupNum = await (async () => {
        const allPlanGroupNum = (await this.findAll()).map(item => item.groupNum)
        let groupNum: number
        while (true) {
          groupNum = +String(Math.random() * 1e9).substr(0, 5)
          if (!allPlanGroupNum.includes(groupNum)) break;
        }
        return groupNum
      })();

      await this.repository.save(planGroup)
      return resultFormat.success({ msg: '计划组创建成功' })
    } catch (error) {
      return resultFormat.error('SERVICE_NOT_ERROR', error)
    }
  }

  findAll() {
    return this.repository.find()
  }

  async findGroupNum(groupNum: number): Promise<PlanGroup | false> {
    const findResult = await this.repository.find({ groupNum })
    return findResult[0] ?? false
  }

  async verifGroupExist(planGroup: Pick<PlanGroup, 'groupNum'>): Promise<boolean> {
    const { groupNum } = planGroup
    const findResult = await this.repository.find({ groupNum })
    return findResult.length > 0
  }

}
