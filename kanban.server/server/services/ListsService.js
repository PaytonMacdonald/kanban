import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getLists(query) {
    const lists = await dbContext.Lists.find(query)
    return lists
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async edit(body) {
    const lists = await dbContext.Lists.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!lists) {
      throw new BadRequest('Invalid Id')
    }
    return lists
  }

  // UPDATE OTHERS
  async delete(id, creatorId) {
    const lists = await dbContext.Lists.findOneAndDelete({ _id: id, creatorId })
    if (!lists) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const listsService = new ListsService()
