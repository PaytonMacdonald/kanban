import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll) // KEEP THIS
      .get('/:id', this.getById)
      .get('/:id/lists', this.getLists)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  // <--------------------------------GET, POST, PUT, DELETE FUNCTIONS GO HERE----------------------------------------->
  async getAll(req, res, next) {
    try {
      const boards = await boardsService.getAll({ creatorId: req.userInfo.id }) // implement on other controlers
      res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  // GET A BOARD WITH A SPECIFIC CREATOR ID/BOARD ID AND DRAW IT TO THE PAGE
  async getById(req, res, next) {
    try {
      const board = await boardsService.getById({ creatorId: req.userInfo.id, _id: req.params.id })
      res.send(board)
    } catch (error) {
      next(error)
    }
  }

  // GO TO LISTSSERVICE, GET THE LISTS WITH A SPECIFIC CREATOR ID AND BOARD ID
  async getLists(req, res, next) {
    try {
      const lists = await listsService.getLists({ creatorId: req.userInfo.id, boardId: req.params.id })
      res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  // IF THE CREATOR ID MATCHES THE USER ID, CREATE THIS BOARD AND DRAW IT TO THE USER'S PROFILE WITH THEIR NAME ATTACHED TO IT
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const boards = await boardsService.create(req.body)
      res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  // IF THE CREATOR ID MATCHES THE USER ID, ALLOW THEM TO EDIT
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

  // IF THE CREATOR ID MATCHES THE USER ID, ALLOW THEM TO DELETE THEIR OWN STUFF
  async delete(req, res, next) {
    try {
      const boards = await boardsService.delete(req.params.id, req.userInfo.id)
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }
}
