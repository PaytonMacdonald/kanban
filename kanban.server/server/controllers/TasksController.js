import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getComments)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments({ creatorId: req.userInfo.id, taskId: req.params.id })
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  //IF THE CREATOR ID MATCHES THE USER ID, CREATE THIS BOARD AND DRAW IT TO THE USER'S PROFILE WITH THEIR NAME ATTACHED TO IT
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const tasks = await tasksService.create(req.body)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
  //IF THE CREATOR ID MATCHES THE USER ID, ALLOW THEM TO EDIT

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
  //IF THE CREATOR ID MATCHES THE USER ID, ALLOW THEM TO DELETE THEIR OWN STUFF
  async delete(req, res, next) {
    try {
      const tasks = await tasksService.delete(req.params.id, req.userInfo.id)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
}
