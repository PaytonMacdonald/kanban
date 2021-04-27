import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
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
      const tasks = await tasksService.getAll(req.query)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tasks = await tasksService.create(req.body)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const tasks = await tasksService.edit(req.body)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const tasks = await tasksService.delete(req.params.id)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
}
