import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }
  //IF THE CREATOR ID MATCHES THE USER ID, CREATE THIS BOARD AND DRAW IT TO THE USER'S PROFILE WITH THEIR NAME ATTACHED TO IT
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comments = await commentsService.create(req.body)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  //IF THE CREATOR ID MATCHES THE USER ID, ALLOW THEM TO EDIT
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const comments = await commentsService.edit(req.body)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  //IF THE CREATOR ID MATCHES THE USER ID, ALLOW THEM TO DELETE THEIR OWN STUFF
  async delete(req, res, next) {
    try {
      const comments = await commentsService.delete(req.params.id, req.userInfo.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}
