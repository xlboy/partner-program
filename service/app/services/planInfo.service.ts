import { getRepository, MongoRepository, Repository } from 'typeorm'
import {  Service } from 'typedi'
import resultFormat from 'app/common/resultFormat';
import PlanInfo from 'app/entities/planInfo.entity';

@Service()
export default class PlanInfoService {
  repository: Repository<PlanInfo>

  constructor() {
    this.repository = getRepository(PlanInfo)
  }

  async create(planInfo: PlanInfo) {
    return '' as any
  }
}
