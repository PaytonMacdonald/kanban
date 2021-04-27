import { boardsService } from '../services/BoardsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const boards = await boardsService.getAll(req.query)
      res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const boards = await boardsService.create(req.body)
      res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const boards = await boardsService.edit(req.body)
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const boards = await boardsService.delete(req.params.id)
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }
}
