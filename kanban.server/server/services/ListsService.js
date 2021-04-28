import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAll(query = {}) {
    const lists = await dbContext.Lists.find(query).populate('Board')
    return lists
  }

  async getLists(id) {
    const lists = await dbContext.Lists.find({ boardId: id })
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

  async delete(id) {
    const lists = await dbContext.Lists.findOneAndDelete({ _id: id })
    if (!lists) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const listsService = new ListsService()
