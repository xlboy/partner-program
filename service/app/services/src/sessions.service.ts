import { getRepository, MongoRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import Session from 'app/entities/sessions.entity'

@Service()
export class SessionsService {
  repository: Repository<Session>

  constructor() {
    this.repository = getRepository(Session)
  }

  async create(session: Session): Promise<Session> {
    return await this.repository.save(session)
  }
}
