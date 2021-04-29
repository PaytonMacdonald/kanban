import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/tasks', this.getTasks)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasks({ creatorId: req.userInfo.id, listId: req.params.id })
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const lists = await listsService.create(req.body)
      res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const lists = await listsService.edit(req.body)
      return res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  // UPDATE OTHERS
  async delete(req, res, next) {
    try {
      const lists = await listsService.delete(req.params.id, req.userInfo.id)
      return res.send(lists)
    } catch (error) {
      next(error)
    }
  }
}
