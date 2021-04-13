import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import resultFormat from 'app/helpers/resultFormat';
import ImPlanGroupMessage from 'app/entities/imPlanGroupMessage.entity';
import Userinfo from '../entities/userinfo.entity';
import PlanGroup from 'app/entities/planGroup.entity';


@Service()
export default class ImPlanGroupMessageService {
  repository: Repository<ImPlanGroupMessage>

  constructor() {
    this.repository = getRepository(ImPlanGroupMessage)
  }


  async create(
    founderId: number,
    planGroupId: number,
    messageContent: ImPlanGroupMessage['content']
  ): Promise<boolean> {
    const userinfo = new Userinfo({ id: founderId })
    const planGroup = new PlanGroup({ id: planGroupId })

    const imPlanGroupMessage = new ImPlanGroupMessage({
      userinfo,
      planGroup,
      content: messageContent
    })
    await this.repository.save(imPlanGroupMessage)
    return true
  }
}
