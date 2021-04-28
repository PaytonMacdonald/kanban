import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('List')
    return tasks
  }

  async getTasks(id) {
    const tasks = await dbContext.Tasks.find({ listId: id })
    return tasks
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async edit(body) {
    const tasks = await dbContext.Tasks.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!tasks) {
      throw new BadRequest('Invalid Id')
    }
    return tasks
  }

  async delete(id) {
    const tasks = await dbContext.Tasks.findOneAndDelete({ _id: id })
    if (!tasks) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const tasksService = new TasksService()
