import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async getBoardById(id) {
    const res = await api.get('api/boards/' + id)
    AppState.activeBoard = res.data
  }
}

export const boardsService = new BoardsService()
