import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import resultFormat from 'app/helpers/resultFormat';
import PlanInfo from 'app/entities/planInfo.entity';
import Userinfo from '../entities/userinfo.entity';
import PlanGroup from 'app/entities/planGroup.entity';


@Service()
export default class PlanInfoService {
  repository: Repository<PlanInfo>

  constructor() {
    this.repository = getRepository(PlanInfo)
  }


  async create(
    _planInfo: Pick<PlanInfo, 'dayTime' | 'startTime' | 'endTime' | 'contentType' | 'content' | 'isRemind' | 'remark'>,
    founderId: number,
    planGroupId: number
  ) {
    const userinfo = new Userinfo({ id: founderId })

    const planGroup = new PlanGroup({ id: planGroupId })

    const planInfo = new PlanInfo({
      ..._planInfo,
      userinfo,
      planGroup
    })
    await this.repository.save(planInfo)
    return resultFormat.success({ msg: '计划创建成功' })
  }
}
