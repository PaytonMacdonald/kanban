import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAll(query = {}) {
    const comments = await dbContext.Comments.find(query).populate('Task')
    return comments
  }

  async getComments(id) {
    const comments = await dbContext.Comments.find({ taskId: id })
    return comments
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async edit(body) {
    const comments = await dbContext.Comments.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!comments) {
      throw new BadRequest('Invalid Id')
    }
    return comments
  }

  async delete(id) {
    const comments = await dbContext.Comments.findOneAndDelete({ _id: id })
    if (!comments) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const commentsService = new CommentsService()
