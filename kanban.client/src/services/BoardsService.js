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

  async createBoard(data) {
    await api.post('api/boards/', data)
  }

  async editBoard(data, id) {
    await api.put('api/boards/' + id, data)
    this.getAllBoards()
  }

  async deleteBoard(id) {
    await api.delete('api/boards/' + id)
  }
}

export const boardsService = new BoardsService()
