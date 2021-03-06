import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAll(query = {}) {
    const boards = await dbContext.Boards.find(query)
    return boards
  }

  async getById(query) {
    const board = await dbContext.Boards.findOne(query)
    return board
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async edit(body) {
    const data = await dbContext.Boards.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async delete(id, creatorId) {
    const data = await dbContext.Boards.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }

  // async findById(id) {
  //   const boards = await dbContext.Boards.findById(id)
  //   if (!boards) {
  //     throw new BadRequest('Invalid Id')
  //   }
  //   return boards
  // }
}

export const boardsService = new BoardsService()
